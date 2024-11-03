import { PickType } from '@nestjs/mapped-types';
import { IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserNameDto extends PickType(CreateUserDto, ['name']) {}

export class UpdateUserEmailDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

export class UpdateUserPasswordDto extends PickType(CreateUserDto, [
  'password',
]) {
  @IsString()
  @MinLength(6)
  'new-password': string;

  @IsString()
  @MinLength(6)
  'new-password-confirmed': string;
}
