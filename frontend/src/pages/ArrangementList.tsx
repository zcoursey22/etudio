import { ListViewContainer } from "../components/list";
import {
  arrangementColumns,
  ArrangementListGridItemContents,
} from "../components/arrangements";
import { useArrangements } from "../hooks/useArrangements";

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
