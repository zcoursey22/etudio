export const API_BASE = "http://localhost:3000";

export const LIST_TYPE_KEY = "etudio_listType";

export enum ResourceType {
  COMPOSITION = "composition",
  ARRANGEMENT = "arrangement",
  GOAL = "goal",
  ROUTINE = "routine",
  SUPPLEMENTARY = "supplementary",
  SOURCE = "source",
  ARTIST = "artist",
}

export const ROUTE_SEGMENTS = {
  ARTISTS: "artists",
  COMPOSITIONS: "compositions",
  SOURCES: "sources",
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
