export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date instanceof Date ? date : new Date(date));
};

export const getTitle = (pageTitle: string) => {
  return `${pageTitle} - Etudio`;
};
