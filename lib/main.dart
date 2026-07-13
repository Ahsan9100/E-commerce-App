import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/theme/app_theme.dart';

import 'providers/auth_provider.dart';
import 'providers/category_provider.dart';
import 'providers/product_provider.dart';
import 'providers/cart_provider.dart';
import 'providers/order_provider.dart';

import 'screens/splashscreen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [

        ChangeNotifierProvider(
          create: (_) => AuthProvider(),
        ),

        ChangeNotifierProvider(
          create: (_) => CategoryProvider(),
        ),

        ChangeNotifierProvider(
          create: (_) => ProductProvider(),
        ),

        ChangeNotifierProvider(
          create: (_) => CartProvider(),
        ),

        ChangeNotifierProvider(
          create: (_) => OrderProvider(),
        ),

      ],

      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: "E-Commerce",

        theme: AppTheme.lightTheme,

        home: SplashScreen(),
      ),
    );
  }
}