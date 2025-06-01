import { Resource } from "../resources/models";
import { registry, ResourceRegistry } from "../resources/registry";
import { ResourceListState } from "./types";

type UseAllSubresourceListsParams = {
  type: keyof ResourceRegistry;
  queryParams?: Record<string, unknown>;
}[];

export const useAllSubresourceLists = (
  entries: UseAllSubresourceListsParams
) => {
  return entries.reduce((acc, { type, queryParams }) => {
    const list = registry[type].useList(queryParams);
    acc[type] = list;
    return acc;
  }, {} as Record<keyof ResourceRegistry, ResourceListState<Resource>>);
};
