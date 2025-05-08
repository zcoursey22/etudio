import { Flex, Icon, Table } from "@chakra-ui/react";
import { LuStar } from "react-icons/lu";

export const FavoriteColumnHeader = () => {
  return (
    <Table.ColumnHeader width={"1"}>
      <Flex align={"center"}>
        <Icon color={"currentcolor"} size={"sm"}>
          <LuStar fill="currentcolor" />
        </Icon>
      </Flex>
    </Table.ColumnHeader>
  );
};
