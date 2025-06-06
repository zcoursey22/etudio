import { useNavigate } from "react-router-dom";
import { useDeleteRoutine } from "../../../hooks";
import { getRoutineListPath } from "../../../routes";
import { Routine } from "../../../resources/models";
import { Box, Button, Flex, Span, Stack } from "@chakra-ui/react";

interface Props {
  handleClose: () => void;
  routine: Routine;
}

export const DeleteRoutineForm = ({ routine, handleClose }: Props) => {
  const { id, name } = routine;
  const { deleteResource } = useDeleteRoutine();
  const navigate = useNavigate();
  const listPath = getRoutineListPath();

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
