export enum STATIC_ROUTES {
  HOME = '/',
  LOGIN = '/login',
  AUTH_REDIRECT = '/auth-redirect',
  DASHBOARD = '/dashboard',
  STUDIES = '/studies',
  MY_PROFILE = '/profile',
  SETTINGS = '/settings',
  COMMUNITY = '/community',
  PROGRAMS = '/programs',
  ERROR = '/error',

  DATA_EXPLORATION = '/data-exploration',
  DATA_EXPLORATION_SUMMARY = '/data-exploration/summary',
  DATA_EXPLORATION_PARTICIPANTS = '/data-exploration/participants',
  DATA_EXPLORATION_BIOSPECIMENS = '/data-exploration/biospecimens',
  DATA_EXPLORATION_DATAFILES = '/data-exploration/datafiles',
  PROFILE_SETTINGS = '/profile/settings',

  VARIANTS = '/variants',
  FILES = '/files',
  PARTICIPANTS = '/participants',
}

export enum DYNAMIC_ROUTES {
  DATA_EXPLORATION = '/data-exploration/:tab?',
  VARIANT_ENTITY = '/variants/:locus?',
  FILE_ENTITY = '/files/:file_id?',
  PARTICIPANT_ENTITY = '/participants/:participant_id?',
  ERROR = '/error/:status?',
  COMMUNITY_MEMBER = '/member/:id',
  STUDY_ENTITY = '/studies/:study_code?',
  PROGRAM_ENTITY = '/programs/:program_id',
}

export const PUBLIC_ROUTES = [STATIC_ROUTES.STUDIES, DYNAMIC_ROUTES.STUDY_ENTITY];
