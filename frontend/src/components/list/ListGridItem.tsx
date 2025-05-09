import { Card, LinkBox } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ListGridItemProps {
  content: ReactNode;
}

export const ListGridItem = ({ content }: ListGridItemProps) => {
  return (
    <Card.Root
      asChild
      size={"sm"}
      variant={"outline"}
      bg={"gray.100"}
      _dark={{ bg: "gray.900" }}
      flex={"1"}
      shadow={"sm"}
      _hover={{ shadow: "md" }}
    >
      <LinkBox>{content}</LinkBox>
    </Card.Root>
  );
};
