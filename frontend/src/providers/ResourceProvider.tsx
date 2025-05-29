import { ResourceContext } from "../contexts";
import { registry } from "../resources/registry";

export function ResourceProvider({
  type,
  children,
}: {
  type: keyof typeof registry;
  children: React.ReactNode;
}) {
  const resourceEntry = registry[type];
  return (
    <ResourceContext.Provider value={resourceEntry}>
      {children}
    </ResourceContext.Provider>
  );
}
