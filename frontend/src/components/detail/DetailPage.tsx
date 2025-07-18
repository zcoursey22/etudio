import { ReactNode } from "react";
import {
  Box,
  Flex,
  Group,
  Heading,
  Separator,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BackButton } from "./BackButton";
import { Resource } from "../../resources/models";
import { Favorite, ActionMenu } from "../resources/shared";
import { Outlet } from "react-router-dom";
import { getTitle } from "../../utils";
import { useResourceContext } from "../../hooks";

interface Props<T extends Resource> {
  resource: T;
  title: string;
  subtitle?: ReactNode;
  rightOfTitle?: ReactNode;
  belowHeader?: ReactNode;
  mainContent?: ReactNode;
}

export const DetailPage = <T extends Resource>({
  resource,
  title,
  subtitle,
  rightOfTitle,
  belowHeader,
  mainContent,
}: Props<T>) => {
  const { useActions, detailPageActionOverrides } = useResourceContext();
  const { actions, modal } = useActions(detailPageActionOverrides);

  return (
    <>
      <title>{getTitle(title)}</title>
      {modal}
      <Stack color={"fg.muted"}>
        <Flex gap={"0.5em"}>
          <BackButton />
          <Box>
            <Group>
              <Favorite id={resource.id} isFavorite={resource.isFavorite} />
              <Span>
                <Heading display="inline-block" color={"fg"}>
                  {title}
                </Heading>
                {rightOfTitle && <Span fontSize={"xs"}>{rightOfTitle}</Span>}
              </Span>
            </Group>
            {subtitle && <Box fontSize={"sm"}>{subtitle}</Box>}
          </Box>
          {actions && (
            <Flex flex={"1"} justify={"flex-end"}>
              <ActionMenu
                resource={resource}
                actions={actions}
                shouldRenderAsButtons
              />
            </Flex>
          )}
        </Flex>
        {belowHeader && <Box>{belowHeader}</Box>}
        {mainContent && (
          <Stack p={"0.5em 0"}>
            <Separator />
            {mainContent}
          </Stack>
        )}
        <Box pt={"0.5em"}>
          <Outlet context={{ resource }} />
        </Box>
      </Stack>
    </>
  );
};
