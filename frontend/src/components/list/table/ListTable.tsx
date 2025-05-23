import { Table, Text } from "@chakra-ui/react";
import { Resource } from "../../../models";
import { ColumnMap, ColumnOverrides, resolveColumns } from "./columns";
import { ListProps } from "../List";
import { LoadingMessage } from "../../LoadingMessage";
import { ErrorMessage } from "../../ErrorMessage";

export interface ListTableProps<T extends Resource> extends ListProps<T> {
  columnMap: ColumnMap<T>;
  columnOverrides?: ColumnOverrides<T>;
}

export const ListTable = <T extends Resource>({
  resources,
  columnMap,
  columnOverrides,
  loading,
  error,
  loadingText,
  errorText,
  emptyText,
}: ListTableProps<T>) => {
  const columns = resolveColumns(columnMap, columnOverrides);

  return (
    <Table.Root
      size="sm"
      interactive
      borderRadius={"sm"}
      borderCollapse={"separate"}
      borderSpacing={"0"}
    >
      <Table.Header>
        <Table.Row>
          {columns.map(({ header, textAlign, width }, i) => (
            <Table.ColumnHeader width={width} textAlign={textAlign} key={i}>
              {header}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {error || loading || !resources?.length ? (
          <Table.Row>
            <Table.Cell colSpan={columns.length} textAlign={"center"}>
              {loading ? (
                <LoadingMessage message={loadingText} />
              ) : error ? (
                <ErrorMessage error={error} message={errorText} />
              ) : (
                <Text textAlign={"center"}>{emptyText}</Text>
              )}
            </Table.Cell>
          </Table.Row>
        ) : (
          resources.map((resource, i) => (
            <Table.Row color="fg.muted" key={i}>
              {columns.map(({ render, textAlign }, j) => (
                <Table.Cell textAlign={textAlign} key={j}>
                  {render(resource)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
};
