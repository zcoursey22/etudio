import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Resource } from "../../resources/models";
import { ReactElement, ReactNode, useState } from "react";
import { getTitle } from "../../utils";
import { ListTypeSwitcher } from "./ListTypeSwitcher";
import { LuPlus } from "react-icons/lu";
import { ListContainerProps } from "./ListContainer";
import { useResourceContext } from "../../hooks";

interface Props<T extends Resource> {
  title: string;
  subtitle?: ReactNode;
  description?: ReactNode;
  renderCreateModal?: (isOpen: boolean, onClose: () => void) => React.ReactNode;
  children: ReactElement<ListContainerProps<T>>;
}

export const ListPage = <T extends Resource>({
  title,
  subtitle,
  description,
  children,
  renderCreateModal,
}: Props<T>) => {
  const { resourceType } = useResourceContext();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
            {renderCreateModal && (
              <>
                <IconButton
                  size={"xs"}
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Icon size={"sm"}>
                    <LuPlus />
                  </Icon>
                </IconButton>
                {renderCreateModal(isCreateModalOpen, () =>
                  setIsCreateModalOpen(false)
                )}
              </>
            )}
            <ListTypeSwitcher listTypeKey={resourceType} />
          </Flex>
        </Flex>
        {children}
      </Stack>
    </>
  );
};
