import {
  Badge,
  Box,
  Button,
  Field,
  Flex,
  Input,
  NativeSelect,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import {
  ApiComposition,
  useArtists,
  useCollections,
  useCompositions,
  useResourceContext,
  useSources,
} from "../../../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Composition, ResourcePayload } from "../../../resources/models";
import { Favorite } from "../shared";
import { useEffect, useRef } from "react";
import { LoadingMessage } from "../../LoadingMessage";

enum FieldType {
  INPUT,
  TEXTAREA,
  SELECT,
}

type FieldRow<T> = (FieldConfig<T> | "favorite")[];

type FieldConfig<T> = {
  name: keyof T;
  label: string;
  type: FieldType;
  required?: boolean;
  showRequiredIndicator?: boolean;
  maxLength?: number;
  defaultValue?: T[keyof T];
  values?: readonly { value: T[keyof T]; label: string }[];
  autoFocus?: boolean;
  placeholder?: string;
  hidden?: boolean;
  disabled?: boolean;
};

interface Props {
  handleClose: () => void;
  composition?: Composition;
}

type Payload = ResourcePayload<ApiComposition> & {
  from: "none" | "collection" | "source" | "partOf";
};

export const CreateCompositionForm = ({ handleClose, composition }: Props) => {
  const { resources: artists, loading: artistsLoading } = useArtists();
  const { resources: sources, loading: sourcesLoading } = useSources();
  const { resources: compositions, loading: compositionsLoading } =
    useCompositions();
  const { resources: collections, loading: collectionsLoading } =
    useCollections();

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
      from: composition?.partOf
        ? "partOf"
        : composition?.source
        ? "source"
        : composition?.collection
        ? "collection"
        : "none",
    },
  });

  const initialized = useRef(false);

  const fromType = watch("from");
  const partOfCompositionId = watch("partOfCompositionId");

  const submit: SubmitHandler<Payload> = ({
    name,
    description,
    artistId,
    isFavorite,
    partOfCompositionId,
    sourceId,
    collectionId,
  }) => {
    const payload = {
      name: name.trim(),
      description: description?.trim(),
      isFavorite,
      artistId: Number(artistId),
      partOfCompositionId: Number(partOfCompositionId) || undefined,
      sourceId: Number(sourceId) || undefined,
      collectionId: Number(collectionId) || undefined,
    };
    console.log(payload);
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

  const fieldRows: FieldRow<Payload>[] = [
    [
      "favorite",
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
        disabled: !!partOfCompositionId,
      },
    ],
    [
      {
        name: "from",
        label: "From",
        type: FieldType.SELECT,
        showRequiredIndicator: true,
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
            value: "collection",
            label: "Collection",
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
          : fromType === "collection"
          ? {
              name: "collectionId",
              label: "",
              type: FieldType.SELECT,
              placeholder: "Select a collection",
              values: collections.map(({ id, name }) => ({
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
            }),
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
    } else if (composition?.collection) {
      setValue("collectionId", composition.collection.id);
      setValue("from", "collection");
    } else if (composition?.partOf) {
      setValue("partOfCompositionId", composition.partOf.id);
      setValue("from", "partOf");
    }

    initialized.current = true;
  }, [composition, sources, collections, compositions, setValue]);

  useEffect(() => {
    if (
      !initialized.current ||
      (fromType === "source" && watch("sourceId") === undefined) ||
      (fromType === "collection" && watch("collectionId") === undefined) ||
      (fromType === "partOf" && watch("partOfCompositionId") === undefined)
    ) {
      return;
    }

    if (fromType === "source") {
      setValue("collectionId", undefined);
      setValue("partOfCompositionId", undefined);
    } else if (fromType === "collection") {
      setValue("sourceId", undefined);
      setValue("partOfCompositionId", undefined);
    } else if (fromType === "partOf") {
      setValue("sourceId", undefined);
      setValue("collectionId", undefined);
    } else {
      setValue("sourceId", undefined);
      setValue("collectionId", undefined);
      setValue("partOfCompositionId", undefined);
    }
  }, [fromType, setValue, watch]);

  useEffect(() => {
    if (!initialized.current || !partOfCompositionId) return;

    const parent = compositions.find(
      ({ id }) => id === Number(partOfCompositionId)
    );
    const parentArtistId = parent?.artist?.id;

    if (parentArtistId && watch("artistId") !== parentArtistId) {
      setValue("artistId", parentArtistId);
    }
  }, [partOfCompositionId, compositions, setValue, watch]);

  if (
    artistsLoading ||
    sourcesLoading ||
    compositionsLoading ||
    collectionsLoading
  ) {
    return <LoadingMessage />;
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <Stack gap={"1em"}>
          {fieldRows.map((row, i) => (
            <Flex key={i} gap="1em" align="flex-end">
              {row.map((field) => {
                if (field === "favorite") {
                  return (
                    <Field.Root key={field} flex={"0"} alignSelf={"center"}>
                      <Controller
                        name="isFavorite"
                        defaultValue={false}
                        control={control}
                        render={({ field }) => (
                          <Favorite
                            isFavorite={field.value}
                            controlledOnClick={() =>
                              field.onChange(!field.value)
                            }
                            color="fg"
                          />
                        )}
                      />
                    </Field.Root>
                  );
                }

                const {
                  name,
                  label,
                  type,
                  required,
                  showRequiredIndicator,
                  defaultValue,
                  values,
                  maxLength,
                  autoFocus,
                  placeholder,
                  hidden,
                  disabled,
                } = field;

                if (hidden) return;

                const value = watch(name as keyof Payload) || "";
                const charCount =
                  typeof value === "string" ? value.trim().length : 0;
                const isOverCharacterLimit =
                  maxLength !== undefined && charCount > maxLength;

                return (
                  <Field.Root
                    key={name}
                    invalid={!!errors[name] || isOverCharacterLimit}
                    required={required}
                    disabled={disabled}
                  >
                    <Field.Label>
                      {label}
                      {showRequiredIndicator && (
                        <Field.RequiredIndicator
                          fallback={
                            !required && (
                              <Badge
                                size={"xs"}
                                fontStyle={"italic"}
                                variant={"plain"}
                                color={"fg.subtle"}
                              >
                                optional
                              </Badge>
                            )
                          }
                        />
                      )}
                      <Field.ErrorText>
                        {isOverCharacterLimit
                          ? `${charCount}/${maxLength} characters`
                          : errors[name]?.message}
                      </Field.ErrorText>
                    </Field.Label>
                    {type === FieldType.INPUT ? (
                      <Input
                        {...register(name, {
                          required: required ? "" : false,
                          validate: (v) =>
                            required
                              ? (v?.toString()?.trim().length ?? 0) > 0 || ""
                              : true,
                          maxLength: {
                            value: maxLength || Infinity,
                            message: "",
                          },
                        })}
                        defaultValue={defaultValue as string}
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                      />
                    ) : type === FieldType.TEXTAREA ? (
                      <Textarea
                        {...register(name, {
                          required: required ? "" : false,
                          validate: (v) =>
                            required
                              ? (v?.toString()?.trim().length ?? 0) > 0 || ""
                              : true,
                          maxLength: {
                            value: maxLength || Infinity,
                            message: "",
                          },
                        })}
                        defaultValue={defaultValue as string}
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                      />
                    ) : (
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          {...register(name, {
                            required: required ? "" : false,
                            validate: (v) =>
                              required ? (v?.toString().length ?? 0) > 0 : true,
                          })}
                          defaultValue={defaultValue as string}
                          autoFocus={autoFocus}
                          placeholder={placeholder}
                        >
                          {values?.map(({ value, label }) => (
                            <option
                              key={value as string}
                              value={value as string}
                            >
                              {label}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    )}
                  </Field.Root>
                );
              })}
            </Flex>
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
