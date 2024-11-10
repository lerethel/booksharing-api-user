import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import {
  UpdateUserEmailDto,
  UpdateUserNameDto,
  UpdateUserPasswordDto,
} from './dto/update-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { User } from './entities/user.entity';
import { UserRoles } from './enums/user-roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly manager: EntityManager,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    await this.manager.flush();
    return user;
  }

  async updateName(dto: UpdateUserNameDto, id: number) {
    (await this.userRepository.findOneOrFail(id)).name = dto.name;
    await this.manager.flush();
    return null;
  }

  async updateEmail(dto: UpdateUserEmailDto, id: number) {
    const foundUser = await this.userRepository.findOneOrFail(id);
    const { email, password } = dto;

    await foundUser.verifyPasswordOrFail(password);

    foundUser.email = email;
    await this.manager.flush();
    return null;
  }

  async updatePassword(dto: UpdateUserPasswordDto, id: number) {
    const { 'new-password': newPassword } = dto;

    if (newPassword !== dto['new-password-confirmed']) {
      throw new BadRequestException('Passwords do not match');
    }

    const foundUser = await this.userRepository.findOneOrFail(id);
    await foundUser.verifyPasswordOrFail(dto.password);

    foundUser.password = newPassword;
    await this.manager.flush();
    return null;
  }

  async updateRole(role: UserRoles, id: number) {
    (await this.userRepository.findOneOrFail(id)).role = role;
    await this.manager.flush();
    return null;
  }

  async remove(dto: DeleteUserDto, id: number) {
    const foundUser = await this.userRepository.findOneOrFail(id);
    await foundUser.verifyPasswordOrFail(dto.password);
    await this.userRepository.nativeDelete(id);
    return null;
  }

  async verify(dto: VerifyUserDto): Promise<Pick<User, 'id' | 'role'> | null> {
    const { email, password } = dto;
    const foundUser = await this.userRepository.findOne({ email });
    return foundUser && (await foundUser.verifyPassword(password))
      ? // The gateway will send this to the auth microservice for storage.
        { id: foundUser.id, role: foundUser.role }
      : null;
  }
}
