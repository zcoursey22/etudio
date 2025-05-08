import { useQuery } from "./useQuery";
import { Supplementary } from "../models";

export const useSupplementaries = () =>
  useQuery<Supplementary[]>("supplementaries", "/supplementaries");

export const useSupplementary = (id: number) =>
  useQuery<Supplementary>("supplementary", `/supplementaries/${id}`);
