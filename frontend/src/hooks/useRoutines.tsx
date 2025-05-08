import { useQuery } from "./useQuery";
import { Routine } from "../models";

export const useRoutines = () =>
  useQuery<Routine[]>("compositions", "/compositions?_expand=artist");

export const useRoutine = (id: number) =>
  useQuery<Routine>("composition", `/compositions/${id}?_expand=artist`);
