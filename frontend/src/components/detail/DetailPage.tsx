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
import { Resource } from "../../models";
import { ActionMap, ActionOverrides, Favorite } from "../resources/shared";
import { Outlet } from "react-router-dom";
import { SubresourceConfig } from "./Subresource";
import { ActionMenu } from "../resources/shared/ActionMenu";

interface Props<T extends Resource> {
  resource: T;
  title: string;
  subtitle?: ReactNode;
  rightOfTitle?: ReactNode;
  belowHeader?: ReactNode;
  mainContent?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subresourceConfigs?: SubresourceConfig<any>[];
  actionMap?: ActionMap<T>;
  actionOverrides?: ActionOverrides<T>;
}

export const DetailPage = <T extends Resource>({
  resource,
  title,
  subtitle,
  rightOfTitle,
  belowHeader,
  mainContent,
  subresourceConfigs,
  actionMap,
  actionOverrides,
}: Props<T>) => {
  return (
    <Stack color={"fg.muted"}>
      <Flex gap={"0.5em"}>
        <BackButton />
        <Box>
          <Group>
            <Favorite isFavorite={resource.isFavorite} />
            <Span>
              <Heading display="inline-block" color={"fg"}>
                {title}
              </Heading>
              {rightOfTitle && <Span fontSize={"xs"}>{rightOfTitle}</Span>}
            </Span>
          </Group>
          {subtitle && <Text fontSize={"sm"}>{subtitle}</Text>}
        </Box>
        {actionMap && (
          <Flex flex={"1"} justify={"flex-end"}>
            <ActionMenu
              resource={resource}
              actionMap={actionMap}
              actionOverrides={actionOverrides}
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
      {subresourceConfigs && (
        <Box pt={"0.5em"}>
          <Outlet context={{ configs: subresourceConfigs }} />
        </Box>
      )}
    </Stack>
  );
};
