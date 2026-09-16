export type ScreenId = 'overview' | 'portal' | 'impressum' | 'datenschutz' | 'teilnahmebedingungen';

export interface PrizeTier {
  place: string;
  amount: string;
  description?: string;
}

export interface TimelineMilestone {
  step: string;
  date: string;
  title: string;
  status: 'completed' | 'active' | 'upcoming';
  description: string;
  location?: string;
}

export interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface SubmissionData {
  projectName: string;
  organization: string;
  legalForm: string;
  contactName: string;
  email: string;
  leipzigConnection: string;
  materialProblem: string;
  customer: string;
  maturity: string;
  files: UploadedFileItem[];
  agreedToTerms: boolean;
  agreedToDataPrivacy: boolean;
}
