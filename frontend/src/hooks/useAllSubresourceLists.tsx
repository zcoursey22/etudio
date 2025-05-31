import { registry } from "../resources/registry";
import { ResourceListState } from "./types";

export const useAllSubresourceLists = <K extends keyof typeof registry>(
  types: K[]
) => {
  return types.reduce((acc, type) => {
    acc[type] = registry[type].useList();
    return acc;
  }, {} as Record<K, ResourceListState<unknown>>);
};
