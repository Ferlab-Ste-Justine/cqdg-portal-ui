import { ArrangerResultsTree } from '../models';

export interface IProgramResultTree {
  Program: ArrangerResultsTree<IProgramEntity>;
}

export interface IProgramEntity {
  id: string;
  keyword: string[];
  study_id: string;
  study_code: string;
  program_id: string;
  program_name_en: string;
  program_name_fr: string;
  description_en: string;
  description_fr: string;
  website: string;
  citation_statement: string;
  contact_name: string;
  contact_email: string;
  contact_institution: string;
  manager_name: string;
  manager_picture: string;
  manager_role: string;
  manager_institution: string;
  funding_sources: string[];
  study_codes: string[];
  program_logo: string;

  logoUrl?: string;
  participants_count: number;
  isAdCard?: boolean;
}
