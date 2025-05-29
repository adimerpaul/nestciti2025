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

  LatLng? _currentPosition = LatLng(-17.9697656,-67.1053412);
  bool _loading = false;
  final MapController _mapController = MapController();

  List _markers = [];

  Future<void> location() async {
    print('Fetching location...');
  }
  _determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    setState(() {
      _loading = true;
    });
    Position pos = await Geolocator.getCurrentPosition();
    LatLng newPosition = LatLng(pos.latitude, pos.longitude);
    setState(() {
      _currentPosition = newPosition;
      _loading = false;
    });
    _mapController.move(newPosition, 16.0);
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
              onPressed: _loading ? null : _determinePosition,
              child: _loading ?
                CircularProgressIndicator(color: Colors.white) :
                Text('Get Current Location', style: TextStyle(fontSize: 16))
          ),
          Expanded(
            child: FlutterMap(
              mapController: _mapController,
              options: MapOptions(
                initialCenter: LatLng(-17.9697656,-67.1053412),
                initialZoom: 14,
                onTap: (tapPosition, point) {
                  // print('Tapped at: $point');
                  setState(() {
                    _markers.add(Marker(
                      point: point,
                      width: 80,
                      height: 80,
                      child: Icon(Icons.location_pin, size: 40, color: Colors.blue),
                    ));
                  });
                },
              ),
              children: [
                TileLayer( // Bring your own tiles
                  urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', // For demonstration only
                  userAgentPackageName: 'com.example.app', // Add your app identifier
                  // And many more recommended properties!
                ),
                MarkerLayer(
                  markers: [
                    // Marker(
                    //   point: _currentPosition ?? LatLng(-17.9697656,-67.1053412), // Use the current position or default
                    //   width: 80,
                    //   height: 80,
                    //   child: Icon(Icons.location_pin, size: 40, color: Colors.red),
                    // ),
                    ..._markers, // Display all markers added by user taps
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
