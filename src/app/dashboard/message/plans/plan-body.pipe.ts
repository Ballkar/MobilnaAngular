import { Pipe, PipeTransform } from '@angular/core';
import { PlanSchemaBodyElement, PlanSchemaBodyTypes } from './models/PlanSchema.model';

@Pipe({
  name: 'planBody'
})
export class PlanBodyPipe implements PipeTransform {

  transform(element: PlanSchemaBodyElement, args?: string): string {
    let result = '';
    result += element.type === PlanSchemaBodyTypes.TEXT ? this.returnTextResult(element) : this.returnVariableResult(element);

    return result;
  }

  private returnTextResult(element: PlanSchemaBodyElement): string {
    return element.text;
  }

  private returnVariableResult(element: PlanSchemaBodyElement): string {
    switch(element.variable.model) {
      case 'customer': {
        return this.customerModel(element.variable.name);
      }
      case 'work': {
        return this.workModel(element.variable.name);
      }
      case 'user': {
        return this.ownerModel(element.variable.name);
      }
      default: {
        console.error('invalid model in PlanBodyPipe');
        break;
      }
    }
    return 'zmienna';
  }

  private customerModel(variableName: string): string {
    switch(variableName) {
      case 'name': {
        return 'Imie Klientki';
      }
      case 'surname': {
        return 'Nazwisko Klientki';
      }
      default: {
        console.error('invalid customer variable name in PlanBodyPipe');
        break;
      }
    }
  }

  private workModel(variableName: string): string {
    switch(variableName) {
      case 'start_date': {
        return 'Data wizyty';
      }
      case 'start_hour': {
        return 'Czas wizyty';
      }
      default: {
        console.error('invalid work variable name in PlanBodyPipe');
        break;
      }
    }
  }

  private ownerModel(variableName: string): string {
    switch(variableName) {
      case 'name': {
        return 'Nazwa salonu';
      }
      case 'phone': {
        return 'Numer kontaktowy';
      }
      default: {
        console.error('invalid owner variable name in PlanBodyPipe');
        break;
      }
    }
  }
}
