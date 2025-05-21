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

export interface Artist extends Resource {
  firstName?: string;
  lastName?: string;
  members?: Artist[];
}

// COMPOSITIONS

export interface Composition extends Resource {
  artist: Artist;
  partOf?: Composition;
  source?: Source;
  collection?: Collection;
  arrangements?: Arrangement[];
}

export interface Source extends Resource {
  type: SourceType;
  parent?: Source;
  children?: Source[];
}

export enum SourceType {
  FILM = "film",
  TELEVISION = "television",
  GAME = "game",
  THEATRE = "theatre",
  OTHER = "other",
}

export interface Collection extends Resource {
  artist: Artist;
}

// ARRANGEMENTS

export interface Arrangement extends Resource {
  composition: Composition;
  artist: Artist;
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

export interface Goal extends Resource {}

// ROUTINES

export interface Routine extends Resource {}

// SUPPLEMENTARIES

export interface Supplementary extends Resource {}
