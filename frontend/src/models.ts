/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface Base {
  id: string;
  name: string;
}

export interface Resource extends Base {
  created: Date;
  lastModified: Date;
  isFavorite?: boolean;
}

export interface Artist extends Resource {
  firstName?: string;
  lastName?: string;
  members?: Artist[];
}

// COMPOSITIONS

export interface Composition extends Resource {
  composer: Artist;
  partOf?: Composition;
  source?: Source;
  collection?: Collection;
  arrangements?: Arrangement[];
}

export interface Source extends Resource {
  source?: Source;
}

export interface Collection extends Resource {
  artist: Artist;
}

// ARRANGEMENTS

export interface Arrangement extends Resource {
  composition: Composition;
  arranger: Artist;
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

export interface Instrument extends Base {
  id: string;
  name: string;
}

// ROUTINES

export interface Routine extends Resource {}

// SUPPLEMENTARIES

export interface Supplementary extends Resource {}
