
export interface StrengthCriteria {
  label: string;
  met: boolean;
  regex: RegExp;
}

export interface PasswordAnalysis {
  score: number;
  label: string;
  color: string;
  feedback: string[];
  criteria: StrengthCriteria[];
}

export type ViewState = 'tool' | 'docs';
