import { useQuery } from "./useQuery";
import { Arrangement } from "../models";

export const useArrangements = () =>
  useQuery<Arrangement[]>("arrangements", "/arrangements?_expand=artist");

export const useArrangement = (id: number) =>
  useQuery<Arrangement>("arrangement", `/arrangements/${id}?_expand=artist`);
