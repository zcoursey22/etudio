import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Resource } from "../../models";
import { cloneElement, ReactElement, ReactNode } from "react";
import { getTitle } from "../../utils";
import { ListProps } from "./List";
import { ListTypeSwitcher } from "./ListTypeSwitcher";
import { LuPlus } from "react-icons/lu";

interface Props<T> {
  id: string;
  title: string;
  subtitle?: ReactNode;
  description?: ReactNode;
  createLabel?: string;
  children: ReactElement<ListProps<T>>;
}

export const ListPage = <T extends Resource>({
  id,
  title,
  subtitle,
  description,
  children,
}: Props<T>) => {
  const listWithId = cloneElement(children, { id });
  return (
    <>
      <title>{getTitle(title)}</title>
      <Stack color={"fg.muted"} fontSize={"md"} gap={"0"}>
        <Flex align={"flex-end"} justify={"space-between"} gap={"0.5em"}>
          <Stack mb={"0.5em"}>
            <Stack gap={"0"}>
              <Heading color={"fg"} size={"3xl"}>
                {title}
              </Heading>
              {subtitle && <Text fontSize={"sm"}>{subtitle}</Text>}
            </Stack>
            {description && <Box>{description}</Box>}
          </Stack>
          <Flex align={"center"} gap={"1em"}>
            <IconButton size={"xs"}>
              <Icon size={"sm"}>
                <LuPlus />
              </Icon>
            </IconButton>
            <ListTypeSwitcher listTypeKey={id} />
          </Flex>
        </Flex>
        {listWithId}
      </Stack>
    </>
  );
};
