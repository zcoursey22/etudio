import { useContext } from "react";
import { ResourceContext } from "../contexts/ResourceContext";
import type { Resource, ResourcePayload } from "../resources/models";
import type { ResourceRegistryEntry } from "../resources/registry";

export function useResourceContext<
  T extends Resource,
  TPayload extends ResourcePayload<T> = ResourcePayload<T>
>(): ResourceRegistryEntry<T, TPayload> {
  const ctx = useContext(ResourceContext);
  if (!ctx) {
    throw new Error(
      "useResourceContext must be used within a ResourceProvider"
    );
  }

  return ctx as unknown as ResourceRegistryEntry<T, TPayload>;
}
