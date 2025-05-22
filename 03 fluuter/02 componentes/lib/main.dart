import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int _contador = 0;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home:Scaffold(
        appBar: AppBar(
          title: Text('Contador'),
          backgroundColor: Colors.black,
          foregroundColor: Colors.white,
        ),
        body: Column(
          children: [
            Text('$_contador',style: TextStyle(fontSize: 50),),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _contador++;
                });
              },
              child: Text('Incrementar'),
            ),
          ],
        ),
      )
    );
  }
}