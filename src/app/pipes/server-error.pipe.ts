import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serverError'
})
export class ServerErrorPipe implements PipeTransform {

  transform(errorId: string): string {
    switch(errorId) {
      case 'missing-data':
        return 'Faltam dados obrigatórios. Preencha os campos corretamente';
      case 'invalid-email':
        return 'O email informado não é válido. Insira um email válido';
      case 'email-already-in-use':
        return 'O email informado já está em uso. Insira outro email ou realize o login com ele';
      case 'user-not-found':
        return 'Nenhum usuário com essas informações foi encontrado. Verifique as informações ou cadastre-se';
      case 'invalid-password':
        return 'Senha informada inválida. Insira uma senha válida';
      case 'invalid-date':
        return 'Data informada inválida. Insira uma data válida';
      case 'old-startDate':
        return 'Data de início é anterior a data atual (hoje), insira uma data futura';
      case 'old-endDate':
        return 'Data de término é anterior a data de início, insira uma data maior que a de início';
      case 'long-interval':
        return 'O intervalo entre as datas é maior que 2 meses. Crie um evento com intervalo menor';
      case 'invalid-id':
        return 'Identificador do evento ou do criador do evento é inválido';
      case 'event-not-found':
        return 'Nenhum evento encontrado';
      case 'not-deleted':
        return 'Nenhum evento foi removido';
      case 'not-deleted':
        return 'Nenhum evento foi removido';
      case 'invalid-token':
        return 'Sessão terminada, realize novamente seu login';
      case 'invalid-header':
        return 'Usuário inválido, realize novamente seu login';
      default:
        return 'Erro interno, tente novamente mais tarde';
    }
  }

}
