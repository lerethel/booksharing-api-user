import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @Transform(({ value }) => (value as string).toLowerCase())
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
