import { ISavedSet } from 'store/savedSet/types';

export type TUserSavedSet = ISavedSet & {
  keycloak_id: string;
  creation_date: string;
  updated_date: string;
  is_invisible: boolean;
};

export type TUpdateSet = ISavedSet & {
  subAction: string;
  newTag?: string;
};

export type IUserSetOutput = {
  updated_date: string;
  id: string;
  tag: string;
  size: number;
  setType: SetType;
  ids: string[];
  is_phantom_manifest?: boolean;
  withFamily?: boolean;
  is_invisible: boolean;
};

export type TUserSavedSetInsert = Omit<
  TUserSavedSet,
  'keycloak_id' | 'updated_date' | 'creation_date'
>;

export type TUserSavedSetUpdate = Partial<ISavedSet> & { subAction: string; newTag?: string };

export enum SetType {
  BIOSPECIMEN_REQUEST = 'biospecimen-request',
  PARTICIPANT = 'Participant',
  FILE = 'File',
  BIOSPECIMEN = 'Biospecimen',
  VARIANT = 'Variant',
}
