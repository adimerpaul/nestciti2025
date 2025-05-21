import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  TextEditingController searchController = TextEditingController();
  List Peliculas = [];

  buscar() async {
    // print(searchController.text);
    // const url = 'https://api.themoviedb.org/3/search/movie?query='+ s +'&language=es';
    final searh = searchController.text;
    final token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2NmNGRhNzg5MzIyNjlkZjA2NTQ3MGFmMWI4YzZkOSIsIm5iZiI6MTY5Nzk3MDgwMC43MzIsInN1YiI6IjY1MzRmYTcwMmIyMTA4MDBlMjNjYTUyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o5edMhhpOPtVQS91djx3jKLVvws2rg0x2aZBuacvG2Y';
    final url = 'https://api.themoviedb.org/3/search/movie?query=$searh&language=es';
    final uri = Uri.parse(url);
    final response = await http.get(
      uri,
      headers: {
        'Authorization': 'Bearer $token',
        'Accept': 'application/json',
      },
    );
    // print(response.statusCode);
    // print(response.body);
    if(response.statusCode == 200) {
      final data = jsonDecode(response.body);
      setState(() {
        Peliculas = data['results'];
      });
    } else {
      print('error');
    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Cine app'),
        backgroundColor: Colors.purple,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: [
            TextField(
              controller: searchController,
              decoration: InputDecoration(labelText: 'Buscar'),
              keyboardType: TextInputType.text,
            ),
            SizedBox(height: 20),
            ElevatedButton(
                onPressed: buscar,
                child: Text('Buscar')
            ),
            SizedBox(height: 20),
            Expanded(
              child: ListView.builder(
                itemCount: Peliculas.length,
                itemBuilder: (context, index) {
                  return Card(
                    child: Column(
                      children: [
                        Image.network('https://image.tmdb.org/t/p/w500' + Peliculas[index]['poster_path']),
                        Text(Peliculas[index]['title']),
                        Text(Peliculas[index]['overview']),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
