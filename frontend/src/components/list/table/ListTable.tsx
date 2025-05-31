import { Table, Text } from "@chakra-ui/react";
import { Resource } from "../../../resources/models";
import {
  ColumnMap,
  ColumnOverrides,
  favoriteColumnConfig,
  resolveColumns,
} from "./columns";
import { ListProps } from "../List";
import { LoadingMessage } from "../../LoadingMessage";
import { ErrorMessage } from "../../ErrorMessage";
import { useResourceContext } from "../../../hooks";
import { ResourceListState } from "../../../hooks/types";

export interface ListTableProps<T> extends ListProps<T> {
  columnOverrides?: ColumnOverrides<T>;
}

export const ListTable = <T extends Resource>({
  resources,
  columnOverrides,
  actionOverrides,
  loading,
  error,
  loadingText,
  errorText,
  emptyText,
}: ListTableProps<T> & ResourceListState<T>) => {
  const { getColumns, useActions } = useResourceContext();
  const { actions, modal } = useActions(actionOverrides);

  const columns = resolveColumns(
    { favoriteColumnConfig, ...getColumns(actions) } as ColumnMap<unknown>,
    columnOverrides as ColumnOverrides<unknown>
  );

  return (
    <>
      {modal}
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
    </>
  );
};
