import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'The email of an already created/registered user',
    required: true,
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the already registered user',
    required: true,
    example: 'StrongPassword123!',
  })
  @IsString()
  password: string;
}
