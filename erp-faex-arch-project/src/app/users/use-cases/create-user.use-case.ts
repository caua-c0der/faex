import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepo: IUserRepository,
  ) {}

  async execute(data: { id: string; name: string; email: string }) {
    const user = new User();
    user.id = data.id;
    user.name = data.name;
    user.email = data.email;

    return await this.userRepo.create(user);
  }
}
