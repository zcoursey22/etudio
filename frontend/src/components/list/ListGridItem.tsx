import { Card } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ListGridItemProps {
  content: ReactNode;
}

export const ListGridItem = ({ content }: ListGridItemProps) => {
  return (
    <Card.Root size={"sm"} variant={"outline"} flex={"1"}>
      {content}
    </Card.Root>
  );
};
