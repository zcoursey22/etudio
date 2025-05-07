import {
  Card,
  Checkbox,
  Flex,
  Icon,
  LinkOverlay,
  Table,
} from "@chakra-ui/react";
import { ListViewContainer } from "../components/list";
import { Artist, Composition } from "../models";
import { NavLink } from "../components/nav/NavLink";
import { getComposerDetailPath, getCompositionDetailPath } from "../routes";
import { formatDate } from "../utils";
import { LuStar } from "react-icons/lu";

const artists: { [key: string]: Artist } = {
  chopin: {
    id: "1",
    name: "Frederic Chopin",
    created: new Date(),
    lastModified: new Date(),
  },
  bach: {
    id: "2",
    name: "Johann Sebastian Bach",
    created: new Date(),
    lastModified: new Date(),
  },
  beethoven: {
    id: "3",
    name: "Ludwig van Beethoven",
    created: new Date(),
    lastModified: new Date(),
  },
  kondo: {
    id: "4",
    name: "Koji Kondo",
    created: new Date(),
    lastModified: new Date(),
  },
  dcfc: {
    id: "5",
    name: "Death Cab for Cutie",
    created: new Date(),
    lastModified: new Date(),
  },
};

const nocturneOp9: Composition = {
  id: "7",
  created: new Date(),
  lastModified: new Date(),
  name: "Nocturne, Op. 9",
  composer: artists.chopin,
};

const compositions: Composition[] = [
  {
    id: "1",
    created: new Date(),
    lastModified: new Date(),
    isFavorite: true,
    name: "Ode to Joy",
    composer: artists.beethoven,
    partOf: {
      composer: artists.beethoven,
      name: "Symphony No. 9",
      id: "5",
      created: new Date(),
      lastModified: new Date(),
    },
  },
  {
    id: "2",
    created: new Date(),
    lastModified: new Date(),
    name: "Cello Suite No. 1 - Prelude",
    composer: artists.bach,
    partOf: {
      id: "6",
      created: new Date(),
      lastModified: new Date(),
      name: "Cello Suite No. 1",
      composer: artists.bach,
    },
  },
  {
    id: "3",
    created: new Date(),
    lastModified: new Date(),
    name: "Nocturne, Op. 9, No. 2",
    composer: artists.chopin,
    partOf: nocturneOp9,
  },
  {
    id: "4",
    created: new Date(),
    lastModified: new Date(),
    name: "Athletic Theme",
    composer: artists.kondo,
    source: {
      id: "6",
      name: "Yoshi's Island",
      created: new Date(),
      lastModified: new Date(),
    },
  },
  nocturneOp9,
  {
    id: "8",
    created: new Date(),
    lastModified: new Date(),
    name: "Bixby Canyon Bridge",
    composer: artists.dcfc,
    collection: {
      id: "9",
      name: "Narrow Stairs",
      artist: artists.dcfc,
      created: new Date(),
      lastModified: new Date(),
    },
  },
];
const loading = false;
const error = undefined;

export const CompositionList = () => {
  return (
    <ListViewContainer
      title="Compositions"
      items={compositions}
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
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader>Composer</Table.ColumnHeader>
          <Table.ColumnHeader>From</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Last modified</Table.ColumnHeader>
        </>
      )}
      renderRowContents={({
        id,
        lastModified,
        isFavorite,
        name,
        composer,
        source,
        partOf,
        collection,
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
            <NavLink to={getCompositionDetailPath(id)}>{name}</NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink to={getComposerDetailPath(id)}>{composer.name}</NavLink>
          </Table.Cell>
          <Table.Cell>
            {partOf
              ? partOf.name
              : source
              ? source.name
              : collection
              ? collection.name
              : "-"}
          </Table.Cell>
          <Table.Cell textAlign="end">{formatDate(lastModified)}</Table.Cell>
        </>
      )}
      renderGridItemContents={({ id, name, composer, isFavorite }) => (
        <>
          <Card.Body>
            <Card.Title>
              <LinkOverlay asChild>
                <NavLink
                  colorPalette={"gray"}
                  to={getCompositionDetailPath(id)}
                >
                  {name}
                </NavLink>
              </LinkOverlay>
            </Card.Title>
            <Card.Description>
              <NavLink to={getComposerDetailPath(id)}>{composer.name}</NavLink>
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Icon color={isFavorite ? "orange" : "fg"}>
              <LuStar fill={isFavorite ? "orange" : "none"} />
            </Icon>
          </Card.Footer>
        </>
      )}
    />
  );
};
