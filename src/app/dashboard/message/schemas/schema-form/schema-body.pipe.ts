import { Pipe, PipeTransform } from '@angular/core';
import { MessageSchemaBodyModel, SCHEMABODYTYPES } from '../../message.model';
import { BodyAttribute } from '../BodyAttribute.model';

@Pipe({
  name: 'schemaBody'
})
export class SchemaBodyPipe implements PipeTransform {
  transform(value: MessageSchemaBodyModel) {
    switch (value.type) {
      case SCHEMABODYTYPES.TEXT:
        return value.text;

      case SCHEMABODYTYPES.VARIABLE:
        const attribute = new BodyAttribute(value.model, value.variable);
        return attribute.alias;

      default:
        const exhaustCheck: never = value.type;
    }
  }


}
