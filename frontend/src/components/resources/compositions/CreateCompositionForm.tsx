import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import {
  ApiComposition,
  useArtists,
  useCompositions,
  useResourceContext,
  useSources,
} from "../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Composition,
  CompositionType,
  ResourcePayload,
} from "../../../resources/models";
import { useEffect, useRef } from "react";
import { LoadingMessage } from "../../LoadingMessage";
import {
  FieldType,
  FavoriteField,
  FieldRowConfig,
  FieldRow,
} from "../shared/form";
import { CatalogEntriesFieldset } from "./CatalogEntriesFieldset";
import { capitalize } from "../../../utils";

interface Props {
  handleClose: () => void;
  composition?: Composition;
  partOfCompositionId?: number;
}

type Payload = ResourcePayload<ApiComposition> & {
  from: "none" | "source" | "partOf";
};

export const CreateCompositionForm = ({
  handleClose,
  composition,
  partOfCompositionId,
}: Props) => {
  const { resources: artists, loading: artistsLoading } = useArtists();
  const { resources: sources, loading: sourcesLoading } = useSources();
  const { resources: compositions, loading: compositionsLoading } =
    useCompositions();
  const compositionTypes = Object.keys(CompositionType) as Array<
    keyof typeof CompositionType
  >;

  const { useCreate, useUpdate } = useResourceContext();
  const { createResource } = useCreate();
  const { updateResource } = useUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<Payload>({
    defaultValues: {
      ...composition,
      partOfCompositionId,
      from:
        composition?.partOf || partOfCompositionId
          ? "partOf"
          : composition?.source
          ? "source"
          : "none",
    },
  });

  const initialized = useRef(false);

  const fromType = watch("from");
  const partOfCompositionIdField = watch("partOfCompositionId");

  const submit: SubmitHandler<Payload> = ({
    name,
    description,
    artistId,
    isFavorite,
    partOfCompositionId,
    sourceId,
    catalogEntries,
    type,
  }) => {
    const payload = {
      name: name.trim(),
      description: description?.trim(),
      isFavorite,
      artistId: Number(artistId),
      partOfCompositionId: Number(partOfCompositionId) || undefined,
      sourceId: Number(sourceId) || undefined,
      catalogEntries: catalogEntries?.map((entry) => ({
        ...entry,
        number: entry.number.trim(),
        subNumber: entry.subNumber?.trim(),
      })),
      type,
    };
    console.log(composition, payload);
    const apiCall = composition
      ? updateResource({ id: composition.id, payload, method: "PUT" })
      : createResource(payload);
    apiCall
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        handleClose();
      });
  };

  const fieldRows: FieldRowConfig<Payload>[] = [
    [
      {
        render: ({ control }) => (
          <FavoriteField
            control={control}
            register={register}
            errors={errors}
          />
        ),
        key: "favorite",
      },
      {
        name: "name",
        label: "Name",
        type: FieldType.INPUT,
        required: true,
        showRequiredIndicator: true,
        maxLength: 50,
        autoFocus: true,
      },
    ],
    [
      {
        name: "type",
        label: "Type",
        type: FieldType.SELECT,
        placeholder: "Select a type",
        required: true,
        showRequiredIndicator: true,
        defaultValue: CompositionType.WORK,
        values: compositionTypes.map((type) => ({
          value: CompositionType[type],
          label: capitalize(CompositionType[type]),
        })),
      },
      {
        name: "artistId",
        label: "Composer",
        type: FieldType.SELECT,
        placeholder: "Select an artist",
        required: true,
        showRequiredIndicator: true,
        values: artists.map((artist) => ({
          value: String(artist.id),
          label: artist.name,
        })),
        disabled: !!partOfCompositionIdField,
      },
    ],
    [
      {
        name: "from",
        label: "From",
        type: FieldType.SELECT,
        showRequiredIndicator: true,
        disabled: !!partOfCompositionId,
        values: [
          {
            value: "none",
            label: "Not associated with anything",
          },
          {
            value: "source",
            label: "Source",
          },
          {
            value: "partOf",
            label: "Composition",
          },
        ],
      },
      {
        ...(fromType === "source"
          ? {
              name: "sourceId",
              label: "",
              type: FieldType.SELECT,
              placeholder: "Select a source",
              values: sources.map(({ id, name }) => ({
                value: String(id),
                label: name,
              })),
            }
          : {
              name: "partOfCompositionId",
              label: "",
              type: FieldType.SELECT,
              placeholder: "Select a composition",
              values: compositions
                .filter(({ id }) => composition?.id !== id)
                .map(({ id, name }) => ({
                  value: String(id),
                  label: name,
                })),
              hidden: fromType === "none",
              disabled: !!partOfCompositionId,
            }),
      },
    ],
    [
      {
        render: ({ control }) => (
          <CatalogEntriesFieldset
            control={control}
            register={register}
            errors={errors}
          />
        ),
        key: "catalogEntries",
      },
    ],
    [
      {
        name: "description",
        label: "Description",
        type: FieldType.TEXTAREA,
        showRequiredIndicator: true,
        maxLength: 250,
      },
    ],
  ];

  useEffect(() => {
    if (initialized.current) return;

    if (composition?.source) {
      setValue("sourceId", composition.source.id);
      setValue("from", "source");
    } else if (composition?.partOf) {
      setValue("partOfCompositionId", composition.partOf.id);
      setValue("from", "partOf");
    }

    initialized.current = true;
  }, [composition, sources, compositions, setValue]);

  useEffect(() => {
    if (
      !initialized.current ||
      (fromType === "source" && watch("sourceId") === undefined) ||
      (fromType === "partOf" && watch("partOfCompositionId") === undefined)
    ) {
      return;
    }

    if (fromType === "source") {
      setValue("partOfCompositionId", undefined);
    } else if (fromType === "partOf") {
      setValue("sourceId", undefined);
    } else {
      setValue("sourceId", undefined);
      setValue("partOfCompositionId", undefined);
    }
  }, [fromType, setValue, watch]);

  useEffect(() => {
    if (!initialized.current || !partOfCompositionIdField) return;

    const parent = compositions.find(
      ({ id }) => id === Number(partOfCompositionIdField)
    );
    const parentArtistId = parent?.artist?.id;

    if (parentArtistId && watch("artistId") !== parentArtistId) {
      setValue("artistId", parentArtistId);
    }
  }, [partOfCompositionIdField, compositions, setValue, watch]);

  if (artistsLoading || sourcesLoading || compositionsLoading) {
    return <LoadingMessage />;
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <Stack gap={"1em"}>
          {fieldRows.map((row, i) => (
            <FieldRow
              key={i}
              row={row}
              control={control}
              register={register}
              errors={errors}
            />
          ))}
          <Flex mt={"1em"} gap={"0.5em"} justifyContent={"flex-end"}>
            <Button variant={"surface"} onClick={handleClose}>
              Cancel
            </Button>
            <Button type={"submit"}>{composition ? "Update" : "Create"}</Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
