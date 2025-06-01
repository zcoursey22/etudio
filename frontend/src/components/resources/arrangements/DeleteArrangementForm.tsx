import { useNavigate } from "react-router-dom";
import { useDeleteArrangement } from "../../../hooks";
import { getArrangementListPath } from "../../../routes";
import { Arrangement } from "../../../resources/models";
import { Box, Button, Flex, Span, Stack } from "@chakra-ui/react";

interface Props {
  handleClose: () => void;
  arrangement: Arrangement;
}

export const DeleteArrangementForm = ({ arrangement, handleClose }: Props) => {
  const { id, name } = arrangement;
  const { deleteResource } = useDeleteArrangement();
  const navigate = useNavigate();
  const listPath = getArrangementListPath();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteResource(id);
    if (location.pathname.startsWith(`${listPath}/`)) {
      navigate(listPath, { replace: true });
    }
    handleClose();
  };

  return (
    <Box>
      <form onSubmit={submit}>
        <Stack gap={"1em"}>
          <Span color={"fg.muted"}>
            Are you sure you want to delete{" "}
            <Span fontWeight={"semibold"} color={"fg"}>
              {name}
            </Span>
            ?
          </Span>
          <Flex mt={"1em"} gap={"0.5em"} justifyContent={"flex-end"}>
            <Button variant={"surface"} onClick={handleClose}>
              Cancel
            </Button>
            <Button type={"submit"} colorPalette={"red"} autoFocus>
              Delete
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
