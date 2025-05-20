import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {

  List pokemons = [];

  @override
  void initState() {
    super.initState();
    pokemonGet();
  }
  Future<void> pokemonGet() async {
    // https://pokeapi.co/api/v2/pokemon?limit=151
    var url = Uri.parse('https://pokeapi.co/api/v2/pokemon?limit=151');
    var res = await http.get(url);
    if (res.statusCode == 200) {
      var data = res.body;
      var jsonData = convert.jsonDecode(data);
      setState(() {
        pokemons = jsonData['results'];
      });
    } else {
      throw Exception('Failed to load pokemons');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pokedex'),
        backgroundColor: Colors.red,
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          // Image.network(
          //   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
          //   height: 100,
          // ),
          Expanded(
          child: ListView.builder(
            itemCount: pokemons.length,
            itemBuilder: (context, index) {
              return Card(
                child: ListTile(
                  title: Text(pokemons[index]['name']),
                  leading: Image.network(
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png',
                    height: 50,
                  ),
                  // trailing: const Icon(Icons.arrow_forward_ios),
                  onTap: () {
                    // Navigate to details page
                  },
                ),
              );
            },
          ),
        ),]
      ),
    );
  }
}
