export interface PlanSchema {
  id: number;
  type: PLANTYPES;
  body: PlanSchemaBodyElement[],
}
export interface PlanSchemaBodyElement {
  variable?: {
    model: string;
    name: string;
  };
  text?: string;
  type: PlanSchemaBodyTypes;
}

export enum PlanSchemaBodyTypes { VARIABLE = 'VARIABLE', TEXT = 'TEXT' }
export enum PLANTYPES { REMIND = "REMIND" }
