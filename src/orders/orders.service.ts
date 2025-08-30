import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, createOrderDto: CreateOrderDto) {
    const order = this.prisma.order.create({
      data: {
        ...createOrderDto,
        userId: userId,
      },
    });
    return order;
  }

  findAll() {
    return `This action returns all orders`;
  }
}
