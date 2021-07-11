import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {

  transform(error: any, fieldName: string): string {
    if(!error) {
      return '';
    }
    switch(Object.keys(error)[0]) {
      case 'required':
        return `O campo '${fieldName}' é obrigatório`;
      case 'minlength':
        return `O campo '${fieldName}' precisa de no mínimo ${error.minlength.requiredLength} caracteres`;
      case 'maxlength':
        return `O campo '${fieldName}' possui o limite de ${error.maxlength.requiredLength} caracteres`;
      case 'email':
        return `O campo '${fieldName}' precisa ser um email válido`;
      default:
        return '';
    }
  }
}
