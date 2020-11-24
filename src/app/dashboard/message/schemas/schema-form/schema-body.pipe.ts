import { Pipe, PipeTransform } from '@angular/core';
import { MessageSchemaBodyModel, SCHEMABODYTYPES } from '../../message.model';

@Pipe({
  name: 'schemaBody'
})
export class SchemaBodyPipe implements PipeTransform {

  transform(value: MessageSchemaBodyModel, ...args: any[]): string {
    if (value.type === SCHEMABODYTYPES.TEXT) {
      return value.text;
    } else {
      return '{' + this.mapVariable(value) + '}';
    }
  }

  private mapVariable(value: MessageSchemaBodyModel) {
    switch (value.model) {
      case 'customer':
        return this.customerVariable(value.variable);
      case 'user':
        return this.userVariable(value.variable);
      case 'work':
        return this.workVariable(value.variable);

      default:
        console.error('unknown model in SchemaBodyPipe');
    }
    return value.model + '-' + value.variable;
  }

  private customerVariable(value: string) {
    switch (value) {
      case 'name':
        return 'Imie klientki';
      case 'surname':
        return 'Nazwisko klientki';

      default:
        console.error('unknown variable variable from customer model in SchemaBodyPipe');
    }
  }

  private userVariable(value: string) {
    switch (value) {
      case 'name':
        return 'Nazwa salonu';

      default:
        console.error('unknown variable variable from user model in SchemaBodyPipe');
    }
  }

  private workVariable(value: string) {
    switch (value) {
      case 'date':
        return 'data wizyty';

      default:
        console.error('unknown variable variable from work model in SchemaBodyPipe');
    }
  }

}
