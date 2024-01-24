import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Insta Gallary'),
      ),
      body: ListView(
        children: const [
          ListTile(
            leading: CircleAvatar(
              child: Icon(Icons.download),
            ),
            title: Text('Instagram Downloader'),
            subtitle: Text('Hello'),
            trailing: Text('11:12 AM'),
          ),
          ListTile(
            leading: CircleAvatar(
              child: Icon(Icons.movie),
            ),
            title: Text('Youtube Downloader'),
            subtitle: Text('Hello'),
            trailing: Text('11:12 AM'),
          ),
        ],
      ),
    );
  }
}
