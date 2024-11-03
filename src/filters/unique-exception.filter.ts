import { UniqueConstraintViolationException } from '@mikro-orm/postgresql';
import { Catch, ConflictException, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(UniqueConstraintViolationException)
export class UserAlreadyExistsExceptionFilter implements RpcExceptionFilter {
  catch() {
    return throwError(
      () => new RpcException(new ConflictException('User already exists')),
    );
  }
}
