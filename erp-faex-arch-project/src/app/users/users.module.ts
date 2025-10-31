import { Module } from '@nestjs/common';
import { UserEventsController } from './user-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UserTypeOrmRepository } from 'src/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserEventsController],
  providers: [
    CreateUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ]
})
export class UsersModule {}
