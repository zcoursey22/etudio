import { useNavigate } from "react-router-dom";
import { useDeleteComposition } from "../../../hooks";
import { getCompositionListPath } from "../../../routes";
import { Composition } from "../../../resources/models";
import { Box, Button, Flex, Span, Stack } from "@chakra-ui/react";

interface Props {
  handleClose: () => void;
  composition: Composition;
}

export const DeleteCompositionForm = ({ composition, handleClose }: Props) => {
  const { id, name } = composition;
  const { deleteResource } = useDeleteComposition();
  const navigate = useNavigate();
  const listPath = getCompositionListPath();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteResource(id)
      .then(() => {
        if (location.pathname.startsWith(`${listPath}/`)) {
          navigate(listPath, { replace: true });
        }
        handleClose();
      })
      .catch((err) => console.error(err));
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
