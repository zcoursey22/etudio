import { ListViewContainer } from "../components/list";
import {
  arrangementColumns,
  ArrangementListGridItemContents,
} from "../components/resources/arrangements";
import { useArrangements } from "../hooks";

export const ArrangementList = () => {
  const listState = useArrangements();
  return (
    <ListViewContainer
      title="Scores"
      useResourcesState={listState}
      columnMap={arrangementColumns}
      renderGridItemContents={(arrangement) => (
        <ArrangementListGridItemContents arrangement={arrangement} />
      )}
    />
  );
};
