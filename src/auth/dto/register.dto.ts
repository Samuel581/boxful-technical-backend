import { IsString, IsEmail, IsEnum, IsDateString } from 'class-validator';
import { Sex } from '../../../generated/prisma';

export class RegisterDTO {
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
