import { Inject, NotFoundException } from '@nestjs/common';
import { IProjectRepository } from 'src/repositories/project.ropository';
import { StartProjectDto } from '../dto/start-project.dto';

export class StartProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private projectRepo: IProjectRepository,
  ) {}

  async execute(id: string, startProjectDto: StartProjectDto) {
    const project = await this.projectRepo.findById(id);

    if (!project) {
      throw new NotFoundException(`O projeto ID ${id} não foi encontrado!`);
    }

    project.start(startProjectDto.startedAt);

    await this.projectRepo.update(project);

    return project;
  }
}
