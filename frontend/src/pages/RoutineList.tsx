import { Card, Table } from "@chakra-ui/react";
import { ListViewContainer } from "../components/list";
import { Routine } from "../models";

const routines: Routine[] = [];
const loading = false;
const error = undefined;

export const RoutineList = () => {
  return (
    <ListViewContainer
      title="Routines"
      items={routines}
      loading={loading}
      error={error}
      renderHeaderRowContents={() => (
        <>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
        </>
      )}
      renderRowContents={(item) => (
        <>
          <Table.Cell>{item.title}</Table.Cell>
        </>
      )}
      renderGridItemContents={(item) => (
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
        </Card.Body>
      )}
    />
  );
};
