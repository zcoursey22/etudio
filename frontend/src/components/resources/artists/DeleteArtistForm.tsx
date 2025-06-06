import { useNavigate } from "react-router-dom";
import {
  useArrangements,
  useCompositions,
  useDeleteArtist,
  useSources,
} from "../../../hooks";
import { getArtistListPath } from "../../../routes";
import { Artist } from "../../../resources/models";
import { Box, Button, Flex, Span, Stack } from "@chakra-ui/react";
import { ErrorMessage } from "../../ErrorMessage";

interface Props {
  handleClose: () => void;
  artist: Artist;
}

export const DeleteArtistForm = ({ artist, handleClose }: Props) => {
  const { id, name } = artist;

  const { resources: albums } = useSources({ artistId: id });
  const { resources: arrangements } = useArrangements({ artistId: id });
  const { resources: compositions } = useCompositions({
    artistId: id,
  });
  const numSubresources =
    albums.length + arrangements.length + compositions.length;

  const { deleteResource } = useDeleteArtist();
  const navigate = useNavigate();
  const listPath = getArtistListPath();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (numSubresources) {
      return;
    }
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
          {!!numSubresources && (
            <ErrorMessage
              message={`This artist cannot be deleted because it has ${numSubresources} subresource${
                numSubresources > 1 ? "s" : ""
              }!`}
            />
          )}
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
