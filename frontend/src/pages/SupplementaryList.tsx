import { List, ListPage } from "../components/list";
import {
  getSupplementaryColumns,
  SupplementaryListGridItemContents,
  useSupplementaryActions,
} from "../components/resources/supplementaries";
import { ResourceType } from "../constants";
import { useSupplementaries } from "../hooks";

export const SupplementaryList = () => {
  return (
    <ListPage
      title={"Supplementaries"}
      subtitle={"Additional materials"}
      id={ResourceType.SUPPLEMENTARY}
    >
      <List
        {...useSupplementaries()}
        columnMap={getSupplementaryColumns(useSupplementaryActions())}
        renderGridItemContents={(supplementary) => (
          <SupplementaryListGridItemContents supplementary={supplementary} />
        )}
      />
    </ListPage>
  );
};
