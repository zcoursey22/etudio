import { ListViewContainer } from "../components/list";
import {
  getSupplementaryColumns,
  SupplementaryListGridItemContents,
  useSupplementaryActions,
} from "../components/resources/supplementaries";
import { useSupplementaries } from "../hooks";
import { getTitle } from "../utils";

export const SupplementaryList = () => {
  const listState = useSupplementaries();
  const actions = useSupplementaryActions();

  return (
    <>
      <title>{getTitle("Supplementaries")}</title>
      <ListViewContainer
        title="Supplementaries"
        useResourcesState={listState}
        columnMap={getSupplementaryColumns(actions)}
        renderGridItemContents={(supplementary) => (
          <SupplementaryListGridItemContents supplementary={supplementary} />
        )}
      />
    </>
  );
};
