import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import {
  hashPassword,
  verifyPassword,
} from 'src/common/helpers/password.helper';
import { LoginDTO } from './dto/login.dto';
import { AuthJwtPayload } from './types/auth-jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userCreationInfo: RegisterDTO) {

    const hashedPassword = await hashPassword(userCreationInfo.password);
    
    const user = await this.usersService.create({
      ...userCreationInfo,
      password: hashedPassword,
    });
    return { user };
  }

  async login(loginInfo: LoginDTO) {

    const user = await this.usersService.findByEmail(loginInfo.email);
    if (!user) throw new BadRequestException(`User with email ${loginInfo.email} not found`);

    const matchingPassword = await verifyPassword(loginInfo.password,user.password,);
    if (!matchingPassword) throw new UnauthorizedException(`Password or user incorrect`);

    const payload: AuthJwtPayload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
