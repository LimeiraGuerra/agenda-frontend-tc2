import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serverError'
})
export class ServerErrorPipe implements PipeTransform {

  transform(errorId: string): string {
    if(!errorId) {
      return '';
    }
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
      default:
        return 'Erro interno, tente novamente mais tarde';
    }
  }

}
