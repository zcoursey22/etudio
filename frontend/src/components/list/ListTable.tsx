import { Table } from "@chakra-ui/react";
import { ListViewProps } from "./ListViewContainer";
import { ReactNode } from "react";
import { Resource } from "../../models";

export interface ListTableViewProps<T> extends ListViewProps<T> {
  renderHeaderRowContents: () => ReactNode;
  renderRowContents: (item: T) => ReactNode;
}

export const ListTable = <T extends Resource>({
  items,
  renderHeaderRowContents,
  renderRowContents,
}: ListTableViewProps<T>) => {
  return (
    <Table.Root size="sm" interactive borderRadius={"sm"}>
      <Table.Header>
        <Table.Row>{renderHeaderRowContents()}</Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row color="fg.muted" key={item.id}>
            {renderRowContents(item)}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
