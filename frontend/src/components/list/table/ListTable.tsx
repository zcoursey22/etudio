import { Table } from "@chakra-ui/react";
import { ListViewProps } from "../ListViewContainer";
import { Resource } from "../../../models";
import { ColumnMap, ColumnOverrides, resolveColumns } from "./columns";

export interface ListTableViewProps<T extends Resource>
  extends ListViewProps<T> {
  columnMap: ColumnMap<T>;
  columnOverrides?: ColumnOverrides<T>;
}

export const ListTable = <T extends Resource>({
  resources,
  columnMap,
  columnOverrides,
}: ListTableViewProps<T>) => {
  const columns = resolveColumns(columnMap, columnOverrides);

  return (
    <Table.Root
      size="sm"
      interactive
      borderRadius={"sm"}
      borderCollapse={"separate"}
      borderSpacing={"0"}
    >
      <Table.Header
        position={"sticky"}
        top={"calc(8.5em + 0.8px)"}
        zIndex={"sticky"}
        pb={"1em"}
        bg={"bg"}
        mr={"-1em"}
        pr={"1em"}
        ml={"-1em"}
        pl={"1em"}
      >
        <Table.Row>
          {columns.map(({ header, textAlign, width }, i) => (
            <Table.ColumnHeader width={width} textAlign={textAlign} key={i}>
              {header}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {resources.map((resource, i) => (
          <Table.Row color="fg.muted" key={i}>
            {columns.map(({ render, textAlign }, j) => (
              <Table.Cell textAlign={textAlign} key={j}>
                {render(resource)}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
