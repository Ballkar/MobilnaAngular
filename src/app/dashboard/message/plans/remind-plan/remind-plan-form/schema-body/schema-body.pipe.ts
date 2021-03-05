import { Pipe, PipeTransform } from '@angular/core';
import { BodyAttribute } from 'src/app/dashboard/message/schemas/BodyAttribute.model';
import { MessageSchemaBodyModel, SCHEMABODYTYPES } from '../../../models/remindPlan.model';

@Pipe({
  name: 'schemaBody'
})
export class SchemaBodyPipe implements PipeTransform {

  transform(value: MessageSchemaBodyModel) {
    switch (value.type) {
      case SCHEMABODYTYPES.TEXT:
        return value.text;

      case SCHEMABODYTYPES.VARIABLE:
        const attribute = new BodyAttribute(value.variable.model, value.variable.name);
        return attribute.alias;

      default:
        const exhaustCheck: never = value.type;
    }
  }


}
