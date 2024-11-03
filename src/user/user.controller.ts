import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserAlreadyExistsExceptionFilter } from '../filters/unique-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import {
  UpdateUserEmailDto,
  UpdateUserNameDto,
  UpdateUserPasswordDto,
} from './dto/update-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'createUser' })
  @UseFilters(UserAlreadyExistsExceptionFilter)
  create(@Payload('dto') dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @MessagePattern({ cmd: 'updateUserName' })
  updateName(
    @Payload('dto') dto: UpdateUserNameDto,
    @Payload('id') id: number,
  ) {
    return this.userService.updateName(dto, id);
  }

  @MessagePattern({ cmd: 'updateUserEmail' })
  updateEmail(
    @Payload('dto') dto: UpdateUserEmailDto,
    @Payload('id') id: number,
  ) {
    return this.userService.updateEmail(dto, id);
  }

  @MessagePattern({ cmd: 'updateUserPassword' })
  updatePassword(
    @Payload('dto') dto: UpdateUserPasswordDto,
    @Payload('id') id: number,
  ) {
    return this.userService.updatePassword(dto, id);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  remove(@Payload('dto') dto: DeleteUserDto, @Payload('id') id: number) {
    return this.userService.remove(dto, id);
  }

  @MessagePattern({ cmd: 'verifyUser' })
  verify(@Payload('dto') dto: VerifyUserDto) {
    return this.userService.verify(dto);
  }
}
