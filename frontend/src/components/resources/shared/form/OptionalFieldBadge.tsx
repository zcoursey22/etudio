import { Badge } from "@chakra-ui/react";

export const OptionalFieldBadge = () => {
  return (
    <Badge
      size={"xs"}
      fontStyle={"italic"}
      variant={"plain"}
      color={"fg.subtle"}
    >
      optional
    </Badge>
  );
};
