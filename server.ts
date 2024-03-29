// server.ts
import Hapi from '@hapi/hapi';
import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
import routes from './routes/routes';
import dotenv from 'dotenv';
import Auth0Auth from './auth0-auth';

dotenv.config()

const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost',
    routes: { cors: { origin: ["*"] } }
  });
  // await server.register({
  //   plugin: HapiCors, // Register the CORS plugin
  //   options: {
  //     origins: ['http://localhost:3000'], // Whitelist the origin of your frontend application
  //     credentials: true // Allow sending cookies cross-origin
  //   }
  // });

  // MongoDB connection URL from env
  const MONGODB = process.env.MONGODB_URL;

  if (!MONGODB) {
    console.error('MongoDB connection URL is not provided in the environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log('MongoDB connected');
  } 
  
  catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }




  server.route(routes);
  // await Auth0Auth.init(server);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err);
  process.exit(1);
});

init();
