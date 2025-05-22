import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Image.network(
          //   'https://www.daily.co/blog/content/images/2023/07/Flutter-feature.png',
          //   fit: BoxFit.cover,
          // ),
          // Image.asset('logo.png',
          //   fit: BoxFit.cover,
          // ),
          // Text('Hola Dart'),
          // Text('Hola flutter',
          //   style: TextStyle(color: Colors.white, fontSize: 45, backgroundColor: Colors.blue,fontWeight: FontWeight.bold),
          //   ),

          // center
          Center(child: Text('Historia del Himno Nacional',style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),textAlign: TextAlign.center)),
          Image.network('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUa7DaKWb_eHdzM5PnsEDMuLnRJ33YdWqatA&s',
            fit: BoxFit.cover,
          ),
          Text('Bolivianos: el hado propicio coronó nuestros votos y anhelo; es ya libre, ya libre este suelo, ya cesó su servil condición.'),
          SizedBox(height: 20),
          Text('Al estruendo marcial que ayer fuera y al clamor de la guerra horroroso siguen hoy, en contraste armonioso, dulces himnos de paz y de unión.'),
          SizedBox(height: 20),
          Text('Loor eterno a los bravos guerreros, heroico valor y firmeza conquistaron las glorias que empieza hoy Bolivia feliz a gozar.'),
          SizedBox(height: 20),
        ],
      ),
    );
  }
}
