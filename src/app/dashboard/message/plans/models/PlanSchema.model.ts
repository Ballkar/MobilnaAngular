export interface PlanSchema {
  id: number;
  type: PLANTYPES;
  body: {
    variable?: {
      model: string;
      name: string;
    };
    text?: string;
    type: SCHEMABODYTYPES;
  }[],
}

export enum SCHEMABODYTYPES { VARIABLE = 'VARIABLE', TEXT = 'TEXT' }
export enum PLANTYPES { REMIND = "REMIND" }
