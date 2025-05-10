import { Heading, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useArrangements, useArtist, useCompositions } from "../hooks";
import { DetailViewContainer } from "../components/detail/DetailViewContainer";
import { ListViewContainer } from "../components/list";
import {
  arrangementColumns,
  ArrangementListGridItemContents,
} from "../components/resources/arrangements";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";

export const ArtistDetail = () => {
  const { id } = useParams();
  const detailState = useArtist(id!);
  const artistId = detailState?.resource?.id;
  const compositionsListState = useCompositions({ artistId });
  const arrangementsListState = useArrangements({ artistId });

  return (
    <DetailViewContainer useResourceState={detailState}>
      {({ name }) => {
        return (
          <>
            <Heading color={"fg"}>{name}</Heading>
            <Stack gap={"1.5em"} mt={"1.5em"}>
              {(!!compositionsListState?.resources?.length ||
                !arrangementsListState?.resources?.length) && (
                <ListViewContainer
                  title={"Compositions"}
                  useResourcesState={compositionsListState}
                  columnMap={compositionColumns}
                  columnOverrides={{ composer: { visible: false } }}
                  renderGridItemContents={(composition) => (
                    <CompositionListGridItemContents
                      composition={composition}
                    />
                  )}
                />
              )}
              {!!arrangementsListState?.resources?.length && (
                <ListViewContainer
                  title={"Scores"}
                  useResourcesState={arrangementsListState}
                  columnMap={arrangementColumns}
                  columnOverrides={{ arranger: { visible: false } }}
                  renderGridItemContents={(arrangement) => (
                    <ArrangementListGridItemContents
                      arrangement={arrangement}
                    />
                  )}
                />
              )}
            </Stack>
          </>
        );
      }}
    </DetailViewContainer>
  );
};
