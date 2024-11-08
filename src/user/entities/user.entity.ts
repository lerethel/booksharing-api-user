import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  Enum,
  EventArgs,
  Opt,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '../enums/user-roles.enum';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true })
  password: string;

  @Enum(() => UserRoles)
  role: UserRoles & Opt = UserRoles.User;

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(args: EventArgs<User>) {
    const payload = args.changeSet?.payload;

    if (payload?.password) {
      this.password = await bcrypt.hash(payload.password, 10);
    }
  }

  async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  async verifyPasswordOrFail(password: string) {
    if (!(await this.verifyPassword(password))) {
      throw new BadRequestException('Wrong password');
    }
  }
}
