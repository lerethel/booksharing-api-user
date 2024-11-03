import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class VerifyUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
