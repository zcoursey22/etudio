/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface Base {
  id: number;
  name: string;
  description?: string;
}

export interface Resource extends Base {
  created: Date;
  lastModified: Date;
  isFavorite: boolean;
}

export type ResourcePayload<T extends Resource> = Omit<
  T,
  "id" | "created" | "lastModified"
>;

export interface Artist extends Resource {
  firstName?: string;
  lastName?: string;
  members?: Artist[];
}

// COMPOSITIONS

export interface Composition extends Resource {
  artist: Artist;
  type: CompositionType;
  partOf?: Composition;
  source?: Source;
  arrangements?: Arrangement[];
  catalogEntries?: CatalogEntry[];
}

export enum CompositionType {
  WORK = "work",
  SYMPHONY = "symphony",
  OPERA = "opera",
  BALLET = "ballet",
  MUSICAL = "musical",
  SUITE = "suite",
  SONATA = "sonata",
  CONCERTO = "concerto",
  MOVEMENT = "movement",
  SONG = "song",
  EXCERPT = "excerpt",
}

export interface CatalogEntry {
  type: CatalogType;
  number: string;
  subNumber?: string; // For defining no. in op.
}

export enum CatalogType {
  OP = "opus",
  BWV = "bach_werke_verzeichnis",
  K = "mozart_koechel",
  WOO = "works_without_opus",
  HWV = "handel_werke_verzeichnis",
  S = "liszt_searle",
  B_BURGHAUSER = "dvorak_burghauser",
  B_BROWN = "chopin_brown",
  D = "schubert_deutsch",
  HOB = "haydn_hoboken",
  RV = "vivaldi_ryom",
  TWV = "telemann_twv",
  BUXWV = "buxtehude_buxwv",
  SZ = "bartok_szolloesy",
  A = "chopin_chominski",
  KK = "chopin_kobylanska",
  FP = "poulenc_schmidt",
  GWV = "graupner_gwv",
  MWV = "mendelssohn_mwv",
}

export interface Source extends Resource {
  type: SourceType;
  artist?: Artist;
  parent?: Source;
  children?: Source[];
}

export enum SourceType {
  ALBUM = "album",
  FILM = "film",
  TELEVISION = "television",
  GAME = "game",
}

// ARRANGEMENTS

export interface Arrangement extends Resource {
  composition: Composition;
  artist: Artist;
  excerpt?: boolean;
  difficulty?: number; // Get rid of this later and use parts[n].difficulty instead
  parts?: Part[];
}

export interface Part extends Base {
  transposed?: number;
  tuning?: Tuning;
  instrument?: Instrument;
  difficulty?: number;
}

export interface Tuning extends Base {
  instrument: Instrument;
}

export interface Instrument extends Base {}

// GOALS

export interface Goal extends Resource {
  status: GoalStatus;
}

export enum GoalStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  PAUSED = "paused",
  DONE = "done",
}

// ROUTINES

export interface Routine extends Resource {}

// SUPPLEMENTARIES

export interface Supplementary extends Resource {}
