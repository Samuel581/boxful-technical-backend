import { IsString, IsEmail, IsEnum, IsDateString } from 'class-validator';
import { Sex } from '@prisma/client';

export class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(Sex)
  sex: Sex;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDateString()
  bornDate: string;
}
