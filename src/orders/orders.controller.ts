import { Controller, Get, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @Request() req: { user: { userId: string } }) {
    return this.ordersService.create(req.user.userId, createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
