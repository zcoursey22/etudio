import { useQuery } from "./useQuery";
import { Composition } from "../models";

export const useCompositions = () =>
  useQuery<Composition[]>("compositions", "/compositions?_expand=artist");

export const useComposition = (id: number) =>
  useQuery<Composition>("composition", `/compositions/${id}?_expand=artist`);
