export interface Resource {
  id: string;
  created: Date;
  lastModified: Date;
  isFavorite?: boolean;
}

export interface Source {
  name: string;
  source?: Source;
}

export interface Collection {
  title: string;
  artist: string; // Composer? Artist and have Composer and Arranger extend from it?
}

export interface Composition extends Resource {
  composer: string;
  title: string;
  partOf?: Composition;
  source?: Source;
  collection?: Collection;
  arrangements: number;
}

export interface Routine extends Resource {
  name: string;
}

export interface Supplementary extends Resource {
  name: string;
}

// export interface Composer {
//   id: string;
//   firstName: string;
//   lastName: string;
// }

// export interface Composition {
//   id: string;
//   composers: Composer[];
//   title: string;
//   parts: Part[];
//   relatedCompositions: Composition[];
// }

// export interface Arranger {
//   id: string;
//   firstName: string;
//   lastName: string;
// }

// export interface Arrangement {
//   id: string;
//   composition: Composition;
//   arrangers: Arranger[];
//   parts: Part[];
// }

// export interface Part {
//   id: string;
//   name: string;
//   transposed: number;
//   tuning: Tuning;
//   instrument: Instrument;
// }

// export interface Tuning {
//   id: string;
//   name: string;
//   instrument: Instrument;
// }

// export interface Instrument {
//   id: string;
//   name: string;
// }
