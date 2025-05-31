export const API_BASE = "http://localhost:3000";

export const LIST_TYPE_KEY = "etudio_listType";

export enum ListId {
  COMPOSITIONS = "compositions",
  ARRANGEMENTS = "arrangements",
  GOALS = "goals",
  ROUTINES = "routines",
  SUPPLEMENTARIES = "supplementaries",
  SOURCES = "sources",
  ARTISTS = "artists",
  COLLECTIONS = "collections",
}

export const ROUTE_SEGMENTS = {
  ARTISTS: "artists",
  COMPOSITIONS: "compositions",
  SOURCES: "sources",
  COLLECTIONS: "collections",
  ARRANGEMENTS: "arrangements",
  ROUTINES: "routines",
  SUPPLEMENTARIES: "supplementaries",
  PROFILE: "profile",
  SETTINGS: "settings",
  LOGIN: "login",
  SIGNUP: "signup",
  TRAINING: "training",
  GOALS: "goals",
} as const;
