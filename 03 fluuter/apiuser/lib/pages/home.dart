import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List usuarios = [];
  TextEditingController nombreController = TextEditingController();
  TextEditingController apellidoController = TextEditingController();

  String url = 'http://localhost:3000/users';

  @override
  void initState() {
    super.initState();
    _getUsers();
  }

  void _getUsers() async {
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      setState(() {
        usuarios = json.decode(response.body);
      });
    } else {
      throw Exception('Failed to load users');
    }
  }

  deleteUser(int id) async {
    // print(id);
    final response = await http.delete(Uri.parse('$url/$id'));
    if (response.statusCode == 200) {
      _getUsers();
    }
  }
  agregar() async{
    // print(nombreController.text);
    final response = await http.post(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'firstName': nombreController.text,
        'lastName': apellidoController.text,
      }),
    );
    if (response.statusCode == 201) {
      nombreController.text = '';
      apellidoController.text = '';
      _getUsers();
    } else {
      throw Exception('Failed to add user');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Usuarios'),
        backgroundColor: Colors.indigo,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: [
            TextField(
              controller: nombreController,
              decoration: const InputDecoration(
                labelText: 'Nombres',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: apellidoController,
              decoration: const InputDecoration(
                labelText: 'Apellidos',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: agregar,
              child: const Text('Agregar'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.indigo,
                foregroundColor: Colors.white,
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: usuarios.length,
                itemBuilder: (context, index) {
                  return Card(
                    child: ListTile(
                      title: Text(usuarios[index]['firstName']),
                      subtitle: Text(usuarios[index]['lastName']),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete),
                        onPressed: () => deleteUser(usuarios[index]['id']),
                      ),
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
