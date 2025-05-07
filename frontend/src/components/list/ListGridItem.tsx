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
      variant={"subtle"}
      flex={"1"}
      shadow={"none"}
      _hover={{ shadow: "sm" }}
    >
      <LinkBox>{content}</LinkBox>
    </Card.Root>
  );
};
