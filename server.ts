// server.ts
import Hapi from '@hapi/hapi';
import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
import routes from './routes/routes';

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // MongoDB connection URL
  const MONGODB_URL = 'mongodb://localhost:27017/mydatabase';



  try {
    await mongoose.connect(MONGODB_URL, {
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

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err);
  process.exit(1);
});

init();
