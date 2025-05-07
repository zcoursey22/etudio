import {
  Card,
  Checkbox,
  Flex,
  Icon,
  LinkOverlay,
  Table,
} from "@chakra-ui/react";
import { ListViewContainer } from "../components/list";
import { Arrangement, Composition } from "../models";
import { NavLink } from "../components/nav/NavLink";
import {
  getArrangementDetailPath,
  getArrangerDetailPath,
  getCompositionDetailPath,
} from "../routes";
import { formatDate } from "../utils";
import { LuDownload, LuExpand, LuStar } from "react-icons/lu";

const athleticTheme: Composition = {
  id: "4",
  created: new Date(),
  lastModified: new Date(),
  name: "Athletic Theme",
  composer: {
    id: "1",
    name: "Koji Kondo",
    created: new Date(),
    lastModified: new Date(),
  },
  source: {
    id: "1",
    name: "Yoshi's Island",
    created: new Date(),
    lastModified: new Date(),
  },
};

const arrangements: Arrangement[] = [
  {
    id: "1",
    name: "athletic-theme.pdf",
    composition: athleticTheme,
    arranger: {
      id: "2",
      name: "Sam Griffin",
      created: new Date(),
      lastModified: new Date(),
    },
    created: new Date(),
    lastModified: new Date(),
  },
];

const loading = false;
const error = undefined;

export const ArrangementList = () => {
  return (
    <ListViewContainer
      title="Scores"
      items={arrangements}
      loading={loading}
      error={error}
      renderHeaderRowContents={() => (
        <>
          <Table.ColumnHeader width={"1"}>
            <Checkbox.Root colorPalette={"blue"}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.ColumnHeader>
          <Table.ColumnHeader width={"1"}>
            <Flex align={"center"}>
              <Icon>
                <LuStar fill="white" />
              </Icon>
            </Flex>
          </Table.ColumnHeader>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Composition</Table.ColumnHeader>
          <Table.ColumnHeader>Arranger</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Last modified</Table.ColumnHeader>
          <Table.ColumnHeader width={"1"} />
        </>
      )}
      renderRowContents={({
        id,
        name,
        arranger,
        composition,
        lastModified,
        isFavorite,
      }) => (
        <>
          <Table.Cell>
            <Checkbox.Root colorPalette={"blue"}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.Cell>
          <Table.Cell>
            <Flex align={"center"}>
              <Icon color={isFavorite ? "orange" : "fg"}>
                <LuStar fill={isFavorite ? "orange" : "none"} />
              </Icon>
            </Flex>
          </Table.Cell>
          <Table.Cell>
            <Flex align={"center"} gap={"0.5em"}>
              <NavLink to={getArrangementDetailPath(id)}>{name}</NavLink>
              <Icon>
                <LuExpand />
              </Icon>
            </Flex>
          </Table.Cell>
          <Table.Cell>
            <NavLink to={getCompositionDetailPath(composition.id)}>
              {composition.name}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink to={getArrangerDetailPath(arranger.id)}>
              {arranger.name}
            </NavLink>
          </Table.Cell>
          <Table.Cell textAlign="end">{formatDate(lastModified)}</Table.Cell>
          <Table.Cell>
            <Flex align={"center"}>
              <Icon>
                <LuDownload />
              </Icon>
            </Flex>
          </Table.Cell>
        </>
      )}
      renderGridItemContents={({ id, name, arranger, isFavorite }) => (
        <>
          <Card.Body>
            <Card.Title>
              <Flex gap={"0.5em"} align={"center"}>
                <LinkOverlay asChild>
                  <NavLink
                    colorPalette={"gray"}
                    to={getArrangementDetailPath(id)}
                  >
                    {name}
                  </NavLink>
                </LinkOverlay>
                <Icon>
                  <LuExpand />
                </Icon>
              </Flex>
            </Card.Title>
            <Card.Description>
              <NavLink to={getArrangerDetailPath(arranger.id)}>
                {arranger.name}
              </NavLink>
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Icon color={isFavorite ? "orange" : "fg"}>
              <LuStar fill={isFavorite ? "orange" : "none"} />
            </Icon>
            <Icon>
              <LuDownload />
            </Icon>
          </Card.Footer>
        </>
      )}
    />
  );
};
