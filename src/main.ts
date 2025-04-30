// src/main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Activer CORS
//   app.enableCors({
//     origin: 'http://localhost:3000', // Remplacez par l'URL de votre frontend
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });

//   // Activer la validation globale
//   app.useGlobalPipes(new ValidationPipe());

//   await app.listen(3000); // Le backend écoute sur le port 3000
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Medical')
    .setDescription('Documentation de l\'API Medical')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Configuration CORS
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:19006',
    'http://127.0.0.1:3000',
    'https://medical-api.onrender.com',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
  });

  // Validation globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Préfixe global pour l'API
  app.setGlobalPrefix('api/v1');

  // Configuration du port
  const port = process.env.PORT || 3000;

  // Démarrage du serveur
  await app.listen(port, '0.0.0.0', () => {
    console.log(`
      🚀 Serveur démarré avec succès !
      🌍 Mode: ${process.env.NODE_ENV || 'development'}
      🔌 Port: ${port}
      📚 Documentation: http://localhost:${port}/api/docs
    `);
  });
}

bootstrap().catch((error) => {
  console.error('Erreur au démarrage du serveur:', error);
  process.exit(1);
});