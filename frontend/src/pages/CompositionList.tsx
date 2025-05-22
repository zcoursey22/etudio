import { ListViewContainer } from "../components/list";
import {
  CompositionListGridItemContents,
  getCompositionColumns,
  useCompositionActions,
} from "../components/resources/compositions";
import { useCompositions } from "../hooks";

export const CompositionList = () => {
  const listState = useCompositions();
  const actions = useCompositionActions();

  return (
    <ListViewContainer
      title="Compositions"
      useResourcesState={listState}
      columnMap={getCompositionColumns(actions)}
      renderGridItemContents={(composition) => (
        <CompositionListGridItemContents composition={composition} />
      )}
    />
  );
};
