export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date instanceof Date ? date : new Date(date));
};

export const getTitle = (pageTitle: string) => {
  return `${pageTitle} - Etudio`;
};

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const getFormattedDescription = (description: string) => {
  return (
    <>
      {description?.split("\n").map((line, i) => (
        <p key={i}>{line || "\u00A0"}</p>
      ))}
    </>
  );
};
