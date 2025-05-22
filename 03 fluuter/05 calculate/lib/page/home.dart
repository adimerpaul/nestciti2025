import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  TextEditingController num1Controller = TextEditingController();
  TextEditingController num2Controller = TextEditingController();
  String result = '';

  void sumar(){
    if(num1Controller.text.isEmpty || num2Controller.text.isEmpty) {
      setState(() {
        result = 'Por favor, ingrese ambos números';
      });
      return;
    }
    double num1 = double.parse(num1Controller.text);
    double num2 = double.parse(num2Controller.text);
    double suma = num1 + num2;
    setState(() {
      result = 'La suma es: $suma';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mi calculadora'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: [
            TextField(
              controller: num1Controller,
              decoration: InputDecoration(labelText: 'Ingrese un num 1'),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 20),
            TextField(
              controller: num2Controller,
              decoration: InputDecoration(labelText: 'Ingrese un num 2'),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 20),
            ElevatedButton(
                onPressed: sumar,
                child: Text('Sumar')
            ),
            SizedBox(height: 20),
            Text(
              result,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
