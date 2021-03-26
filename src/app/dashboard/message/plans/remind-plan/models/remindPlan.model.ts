import { PlanSchema } from "../../models/PlanSchema.model";

export class RemindPlanModel {
  id: number;
  schema_id: number;
  active: boolean;
  schema?: PlanSchema;
  hour: number;
  minute: number;
}
