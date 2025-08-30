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

export class CreateOrderDto {
  @IsString()
  collectionAddress: string;

  @IsString()
  destinationAddress: string;

  @IsString()
  destinationFirstName: string;

  @IsString()
  destinationLastName: string;

  @IsEmail()
  destinationEmail: string;

  @IsString()
  destinationPhone: string;

  // Location details
  @IsString()
  department: string;

  @IsString()
  province: string;

  @IsString()
  reference: string;

  @IsString()
  addressReference: string;

  @IsOptional()
  @IsString()
  additionalNotes?: string;

  @IsDateString()
  scheduledDate: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];
}

export class CreateProductDTO {
  @IsString()
  name: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  length: number;

  @IsNumber()
  height: number;

  @IsNumber()
  width: number;
}
