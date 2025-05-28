import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';
import 'package:url_launcher/url_launcher.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {

  LatLng? _currentPosition = LatLng(-17.9697656,-67.1053412); // Default position

  Future<void> location() async {
    // Implement your location fetching logic here
    // For demonstration, we will just print a message
    print('Fetching location...');
    // You can use packages like geolocator or location to get the actual location
  }
  _determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;

    // Test if location services are enabled.
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // Location services are not enabled don't continue
      // accessing the position and request users of the
      // App to enable the location services.
      return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        // Permissions are denied, next time you could try
        // requesting permissions again (this is also where
        // Android's shouldShowRequestPermissionRationale
        // returned true. According to Android guidelines
        // your App should show an explanatory UI now.
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Permissions are denied forever, handle appropriately.
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    // When we reach here, permissions are granted and we can
    // continue accessing the position of the device.
    Position pos = await Geolocator.getCurrentPosition();
    setState(() {
      _currentPosition = LatLng(pos.latitude, pos.longitude);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Location'),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              // Navigate to settings page
            },
          ),
          IconButton(
            icon: const Icon(Icons.info),
            onPressed: () {
            },
          ),
        ],
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          ElevatedButton(
              onPressed: _determinePosition,
              child: Text('Get Location')
          ),
          Expanded(
            child: FlutterMap(
              options: MapOptions(
                initialCenter: LatLng(-17.9697656,-67.1053412),
                initialZoom: 14,
              ),
              children: [
                TileLayer( // Bring your own tiles
                  urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', // For demonstration only
                  userAgentPackageName: 'com.example.app', // Add your app identifier
                  // And many more recommended properties!
                ),
                MarkerLayer(
                  markers: [
                    Marker(
                      point: _currentPosition ?? LatLng(-17.9697656,-67.1053412), // Use the current position or default
                      width: 80,
                      height: 80,
                      child: Icon(Icons.location_pin, size: 40, color: Colors.red),
                    ),
                  ],
                ),
                RichAttributionWidget( // Include a stylish prebuilt attribution widget that meets all requirments
                  attributions: [
                    TextSourceAttribution(
                      'OpenStreetMap contributors',
                      onTap: () => launchUrl(Uri.parse('https://openstreetmap.org/copyright')), // (external)
                    ),
                    // Also add images...
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
