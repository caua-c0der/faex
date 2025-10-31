import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { Repository } from 'typeorm';

export interface IUserRepository {
  create(user: User): Promise<void>;
}

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepo: Repository<User>,
  ) {}

  async create(user: User): Promise<void> {
    await this.typeOrmRepo.save(user);
  }
}
