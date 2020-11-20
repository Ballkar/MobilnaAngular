import { Pipe, PipeTransform } from '@angular/core';
import { SchemaVariable, SchemaText } from '../../message.model';

@Pipe({
  name: 'schemaBody'
})
export class SchemaBodyPipe implements PipeTransform {

  transform(value: SchemaVariable, ...args: any[]): string {
    const res = '{' + this.mapVariable(value) + '}';
    return res;
  }

  private mapVariable(value: SchemaVariable) {
    switch (value.variable.model) {
      case 'customer':
        return this.customerVariable(value.variable.name);
      case 'user':
        return this.userVariable(value.variable.name);
      case 'work':
        return this.workVariable(value.variable.name);

      default:
        console.error('unknown model in SchemaBodyPipe');
    }
    return value.variable.model + '-' + value.variable.name;
  }

  private customerVariable(value: string) {
    switch (value) {
      case 'name':
        return 'Imie klientki';
      case 'surname':
        return 'Nazwisko klientki';

      default:
        console.error('unknown variable name from customer model in SchemaBodyPipe');
    }
  }

  private userVariable(value: string) {
    switch (value) {
      case 'name':
        return 'Nazwa salonu';

      default:
        console.error('unknown variable name from user model in SchemaBodyPipe');
    }
  }

  private workVariable(value: string) {
    switch (value) {
      case 'date':
        return 'data wizyty';

      default:
        console.error('unknown variable name from work model in SchemaBodyPipe');
    }
  }

}
