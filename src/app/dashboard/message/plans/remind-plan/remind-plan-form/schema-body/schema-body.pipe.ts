import { Pipe, PipeTransform } from '@angular/core';
import { BodyAttribute } from 'src/app/dashboard/message/plans/BodyAttribute.model';
import { PlanBodyModel, PLANBODYTYPES } from '../../models/remindPlan.model';

@Pipe({
  name: 'schemaBody'
})
export class SchemaBodyPipe implements PipeTransform {

  transform(value: PlanBodyModel) {
    switch (value.type) {
      case PLANBODYTYPES.TEXT:
        return value.text;

      case PLANBODYTYPES.VARIABLE:
        const attribute = new BodyAttribute(value.variable.model, value.variable.name);
        return attribute.alias;

      default:
        const exhaustCheck: never = value.type;
    }
  }


}
