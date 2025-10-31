import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { StartProjectDto } from './dto/start-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { FindProjectbyUserUseCase } from './use-cases/find-project-by-user.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';

@Controller('projects')
export class ProjectsController {
  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase;

  @Inject(FindAllProjectsUseCase)
  private readonly findAllProjectsUseCase: FindAllProjectsUseCase;

  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase;

  @Inject(FindProjectbyUserUseCase)
  private readonly findProjectbyUserUseCase: FindProjectbyUserUseCase;

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Get('byuserid/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.findProjectbyUserUseCase.execute(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   return this.projectsService.update(id, updateProjectDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(id);
  // }
}
