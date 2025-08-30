import { JwtModuleOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

//Factory function to register JWT module options and inject them into the JwtModule in a cleaner way
export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  }),
);
