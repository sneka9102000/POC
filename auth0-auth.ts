import { Server } from '@hapi/hapi';
import * as dotenv from 'dotenv';
import * as jwksRsa from 'jwks-rsa';
import * as hapiJwt from 'hapi-auth-jwt2';

dotenv.config();

const validateUser = (decoded:any, request:any, callback:any) => {
 
  console.log("Decoded", decoded);
  if (decoded && decoded.sub) {
    return callback(null, true, {});
  }
}

const init = async (server: Server) => {
  await server.register(hapiJwt);
  

  server.auth.strategy('jwt', 'jwt', {
    complete: true,
    headerKey: 'authorization',
    tokenType: 'Bearer',
    key: jwksRsa.hapiJwt2KeyAsync({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    verifyOptions: {
      audience: process.env.AUTH0_CLIENT_ID,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    },
    validate: validateUser
  });

  server.auth.default('jwt');
};

export default { init };
