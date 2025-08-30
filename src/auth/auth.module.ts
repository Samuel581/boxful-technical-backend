import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(jwtConfig.asProvider()), ConfigModule.forFeature(jwtConfig)],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
