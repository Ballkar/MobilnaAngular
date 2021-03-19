import { Pipe, PipeTransform } from '@angular/core';
import { BodyVariable } from 'src/app/dashboard/message/plans/remind-plan/remind-plan-form/schema-body/BodyVariable.model';
import { PlanBodyModelElement, PLANBODYTYPES } from '../../models/remindPlan.model';

@Pipe({
  name: 'schemaBody'
})
export class SchemaBodyPipe implements PipeTransform {

  transform(value: PlanBodyModelElement) {
    switch (value.type) {
      case PLANBODYTYPES.TEXT:
        return value.text;

      case PLANBODYTYPES.VARIABLE:
        const attribute = new BodyVariable(value.variable.model, value.variable.name);
        return attribute.alias;

      default:
        const exhaustCheck: never = value.type;
    }
  }


}
