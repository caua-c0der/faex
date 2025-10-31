import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

@Controller()
export class UserEventsController {
  constructor(private createUser: CreateUserUseCase) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const msg = context.getMessage();

    // aqui você pode salvar os dados do usuário em uma tabela local (snapshot)
    console.log('Usuário criado recebido no Projects:', data);

    await this.createUser.execute(data);

    // Caso for utilizar a confirmação de mensagem manual
    channel.ack(msg);
  }

  @EventPattern('user.updated')
  async handleUserUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const msg = context.getMessage();

    // atualizar snapshot do usuário no banco do Projects
    console.log('Usuário atualizado:', data);

    channel.ack(msg);
  }
}
