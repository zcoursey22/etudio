import { IconButton } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    window.history.length > 1 && (
      <IconButton
        color={"fg"}
        variant={"plain"}
        size={"lg"}
        onClick={() => navigate(-1)}
      >
        <LuArrowLeft />
      </IconButton>
    )
  );
};
