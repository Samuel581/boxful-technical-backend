import { IsString, IsEmail, IsEnum, IsDateString } from 'class-validator';
import { Sex } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({
    description: 'The first name or first names of the new user',
    required: true,
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name or surnames of the new user',
    required: true,
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The sex of the new user',
    required: true,
    enum: Sex,
    example: Sex.MALE,
  })
  @IsEnum(Sex)
  sex: Sex;

  @ApiProperty({
    description: 'The phone number of the new user',
    required: true,
    example: '+1234567890',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'The email address of the new user',
    required: true,
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for the new user',
    required: true,
    example: 'StrongPassword123!',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The birth date of the new user in ISO 8601 format',
    required: true,
    example: '1990-01-01',
  })
  @IsDateString()
  bornDate: string;
}
