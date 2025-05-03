import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'pages/auth_wrapper.dart';
import 'widgets/error_app.dart';

const firebaseOptions = FirebaseOptions(
  apiKey: "AIzaSyBi-TeUMiK95JYoJ8pdKBzx_8fUDxlC1AU",
  authDomain: "midterm-a2a87.firebaseapp.com",
  databaseURL: "https://midterm-a2a87-default-rtdb.firebaseio.com",
  projectId: "midterm-a2a87",
  storageBucket: "midterm-a2a87.firebasestorage.app",
  messagingSenderId: "967588609033",
  appId: "1:967588609033:web:a9935c19ee83273e384cd8",
  measurementId: "G-K8437ZXJMY"
);

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    if (kIsWeb) {
      await Firebase.initializeApp(options: firebaseOptions);
    } else {
      await Firebase.initializeApp();
    }
    if (Firebase.apps.isEmpty) {
      throw Exception('Firebase initialization failed');
    }
    runApp(const MyApp());
  } catch (e) {
    runApp(ErrorApp(error: e.toString()));
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: '522H0038 AND 522H0121',
      theme: ThemeData(
        primaryColor: const Color.fromARGB(255, 44, 96, 179),
        scaffoldBackgroundColor: Colors.transparent,
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            foregroundColor: Colors.white,
            backgroundColor: const Color.fromARGB(255, 52, 97, 189),
          ),
        ),
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: const Color(0xFF00A79D),
          ),
        ),
        iconTheme: const IconThemeData(
          color: Color.fromARGB(255, 60, 107, 184),
        ),
      ),
      home: const AuthWrapper(),
    );
  }
}