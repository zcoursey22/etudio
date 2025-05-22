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
import { ActionConfig, Favorite } from "../resources/shared";
import { Outlet } from "react-router-dom";
import { SubresourceConfig } from "./Subresource";
import { ActionMenu } from "../resources/shared/ActionMenu";
import { getTitle } from "../../utils";

interface Props<T extends Resource> {
  resource: T;
  title: string;
  subtitle?: ReactNode;
  rightOfTitle?: ReactNode;
  belowHeader?: ReactNode;
  mainContent?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subresourceConfigs?: SubresourceConfig<any>[];
  actions?: ActionConfig<T>[];
}

export const DetailPage = <T extends Resource>({
  resource,
  title,
  subtitle,
  rightOfTitle,
  belowHeader,
  mainContent,
  subresourceConfigs,
  actions,
}: Props<T>) => {
  return (
    <>
      <title>{getTitle(title)}</title>
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
        {subresourceConfigs && (
          <Box pt={"0.5em"}>
            <Outlet context={{ configs: subresourceConfigs }} />
          </Box>
        )}
      </Stack>
    </>
  );
};
