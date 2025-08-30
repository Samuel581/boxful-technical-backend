import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        ...createOrderDto,
        userId: userId,
      },
    });
    return order;
  }

  async findAll(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: userId,
      },
    });
    if (!orders) throw new BadRequestException(`User has not made any order yet`);
    return orders;
  }
}
