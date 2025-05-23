import { ListViewContent } from "../components/list";
import {
  CompositionListGridItemContents,
  getCompositionColumns,
  useCompositionActions,
} from "../components/resources/compositions";
import { useCompositions } from "../hooks";
import { getTitle } from "../utils";

export const CompositionList = () => {
  const listState = useCompositions();
  const actions = useCompositionActions();

  return (
    <>
      <title>{getTitle("Compositions")}</title>
      <ListViewContent
        title="Compositions"
        useResourcesState={listState}
        columnMap={getCompositionColumns(actions)}
        renderGridItemContents={(composition) => (
          <CompositionListGridItemContents composition={composition} />
        )}
      />
    </>
  );
};
