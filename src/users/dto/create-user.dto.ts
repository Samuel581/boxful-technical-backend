import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Sex } from '../../../generated/prisma';

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
}
