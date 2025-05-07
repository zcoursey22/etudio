import { Flex, Icon, Table } from "@chakra-ui/react";
import { LuStar } from "react-icons/lu";

export const FavoriteColumnHeader = () => {
  return (
    <Table.ColumnHeader width={"1"}>
      <Flex align={"center"}>
        <Icon>
          <LuStar fill="white" />
        </Icon>
      </Flex>
    </Table.ColumnHeader>
  );
};
