import { ArrangerResultsTree } from '../models';

export interface IProgramResultTree {
  Program: ArrangerResultsTree<IProgramEntity>;
}

export interface IContact {
  name: string;
  email: string;
  institution: string;
}

export interface IManager {
  name: string;
  picture_url: string;
  role_fr: string;
  role_en: string;
  institution: string;
}

export interface IProgramEntity {
  id: string;
  program_id: string;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  website: string;
  citation_statement: string;
  contacts: IContact[];
  managers: IManager[];
  funding_sources: string[];
  study_codes: string[];
  logo_url: string;

  participants_count: number;
  isAdCard?: boolean;
}
