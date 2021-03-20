import { PlanSchema } from "../../models/PlanSchema.model";

export class RemindPlanModel {
  id: number;
  schema_id: number;
  active: boolean;


  schema?: PlanSchema;


  clear_diacritics: boolean;
  hour: number;
  minute: number;
  time_type: typeof TIMETYPES;
}


export const TIMETYPES = {
  sameDay: '1',
  dayBefore: '2',
};

