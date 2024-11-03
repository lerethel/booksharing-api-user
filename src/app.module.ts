import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Scope } from '@nestjs/common';
import config from './mikro-orm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...config,
      // https://github.com/mikro-orm/mikro-orm/discussions/2531
      registerRequestContext: false,
      scope: Scope.REQUEST,
    }),
    UserModule,
  ],
})
export class AppModule {}
