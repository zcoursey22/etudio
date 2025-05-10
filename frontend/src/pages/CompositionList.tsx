import { ListViewContainer } from "../components/list";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";
import { useCompositions } from "../hooks";

export const CompositionList = () => {
  const listState = useCompositions();
  return (
    <ListViewContainer
      title="Compositions"
      useResourcesState={listState}
      columnMap={compositionColumns}
      renderGridItemContents={(composition) => (
        <CompositionListGridItemContents composition={composition} />
      )}
    />
  );
};
