import { ListViewContainer } from "../components/list";
import {
  supplementaryColumns,
  SupplementaryListGridItemContents,
} from "../components/supplementaries";
import { useSupplementaries } from "../hooks/useSupplementaries";

export const SupplementaryList = () => {
  const listState = useSupplementaries();
  return (
    <ListViewContainer
      title="Supplementaries"
      useResourcesState={listState}
      columnMap={supplementaryColumns}
      renderGridItemContents={(supplementary) => (
        <SupplementaryListGridItemContents supplementary={supplementary} />
      )}
    />
  );
};
