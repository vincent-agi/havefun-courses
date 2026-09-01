export const THALES_SHADOW_RATIO_FORMULA = 'thales-shadow-ratio';

export interface CalculatorField {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
}

export interface CalculatorSchema {
  formula: string;
  fields: CalculatorField[];
  resultLabel: string;
}
