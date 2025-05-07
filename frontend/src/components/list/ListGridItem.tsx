import { Card, LinkBox } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ListGridItemProps {
  content: ReactNode;
}

export const ListGridItem = ({ content }: ListGridItemProps) => {
  return (
    <Card.Root asChild size={"sm"} variant={"outline"} flex={"1"}>
      <LinkBox>{content}</LinkBox>
    </Card.Root>
  );
};
