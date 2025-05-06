export interface Resource {
  id: string;
  favorited?: boolean;
}

export interface Composition extends Resource {
  composer: string;
  title: string;
}

export interface Routine extends Resource {
  title: string;
}

export interface Supplementary extends Resource {
  title: string;
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
