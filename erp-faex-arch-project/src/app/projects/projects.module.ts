import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTypeOrmRepository } from 'src/repositories/project.ropository';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { FindProjectbyUserUseCase } from './use-cases/find-project-by-user.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase,
    FindProjectbyUserUseCase,
    ProjectTypeOrmRepository,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectTypeOrmRepository,
    },
  ],
})
export class ProjectsModule {}
