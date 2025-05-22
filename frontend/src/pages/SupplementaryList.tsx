import { ListViewContainer } from "../components/list";
import {
  getSupplementaryColumns,
  SupplementaryListGridItemContents,
  useSupplementaryActions,
} from "../components/resources/supplementaries";
import { useSupplementaries } from "../hooks";

export const SupplementaryList = () => {
  const listState = useSupplementaries();
  const actions = useSupplementaryActions();

  return (
    <ListViewContainer
      title="Supplementaries"
      useResourcesState={listState}
      columnMap={getSupplementaryColumns(actions)}
      renderGridItemContents={(supplementary) => (
        <SupplementaryListGridItemContents supplementary={supplementary} />
      )}
    />
  );
};
