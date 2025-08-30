import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userInfo: CreateUserDTO): Promise<User | null> {
    const user = await this.prisma.user.create({
      data: userInfo,
    });
    return user;
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user)
      throw new BadRequestException(
        `User with the email ${userEmail} was not found`,
      );
    return user;
  }
}
