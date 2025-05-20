import { Icon, IconButton } from "@chakra-ui/react";
import { LuExpand } from "react-icons/lu";

interface Props {
  pdf: unknown;
}

export const PreviewPDF = ({ pdf }: Props) => {
  return (
    <IconButton
      unstyled
      cursor={"pointer"}
      color={"fg"}
      fontSize={"inherit"}
      zIndex={"1"}
      onClick={() => console.log("PDF preview")}
    >
      <Icon size={"sm"} color="fg">
        <LuExpand />
      </Icon>
    </IconButton>
  );
};
