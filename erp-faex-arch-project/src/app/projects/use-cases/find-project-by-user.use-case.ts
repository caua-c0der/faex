import { Inject } from '@nestjs/common';
import { IProjectRepository } from 'src/repositories/project.ropository';

export class FindProjectbyUserUseCase {
  constructor(
    @Inject('IProjectRepository')
    private projectRepo: IProjectRepository,
  ) {}

  async execute(userId: string) {
    return this.projectRepo.findByUserId(userId);
  }
}
