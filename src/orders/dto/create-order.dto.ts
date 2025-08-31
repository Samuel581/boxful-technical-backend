import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsNumber,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Boxful Storage Box',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Weight of the product in kilograms',
    example: 2.5,
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    description: 'Length of the product in centimeters',
    example: 30,
  })
  @IsNumber()
  length: number;

  @ApiProperty({
    description: 'Height of the product in centimeters',
    example: 20,
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    description: 'Width of the product in centimeters',
    example: 15,
  })
  @IsNumber()
  width: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'The address where the order will be collected',
    example: '123 Main St, Springfield',
  })
  @IsString()
  collectionAddress: string;

  @ApiProperty({
    description: 'The address where the order will be delivered',
    example: '456 Elm St, Shelbyville',
  })
  @IsString()
  destinationAddress: string;

  @ApiProperty({
    description: 'First name of the recipient',
    example: 'Jane',
  })
  @IsString()
  destinationFirstName: string;

  @ApiProperty({
    description: 'Last name of the recipient',
    example: 'Doe',
  })
  @IsString()
  destinationLastName: string;

  @ApiProperty({
    description: 'Email address of the recipient',
    example: 'jane.doe@example.com',
  })
  @IsEmail()
  destinationEmail: string;

  @ApiProperty({
    description: 'Phone number of the recipient',
    example: '+1234567890',
  })
  @IsString()
  destinationPhone: string;

  @ApiProperty({
    description: 'Department of the destination address',
    example: 'Lima',
  })
  @IsString()
  department: string;

  @ApiProperty({
    description: 'Province of the destination address',
    example: 'Lima',
  })
  @IsString()
  province: string;

  @ApiProperty({
    description: 'Additional address reference',
    example: 'Near the central par',
  })
  @IsString()
  addressReference: string;

  @ApiPropertyOptional({
    description: 'Any additional notes for the order',
    example: 'Leave at the front desk if not home',
  })
  @IsOptional()
  @IsString()
  additionalNotes?: string;

  @ApiProperty({
    description: 'Scheduled date for the order in ISO 8601 format',
    example: '2024-07-01T10:00:00.000Z',
  })
  @IsDateString()
  scheduledDate: string;

  @ApiProperty({
    description: 'List of products included in the order',
    type: [CreateProductDTO],
    minItems: 1,
    maxItems: 20,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];
}
