export const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('uk-UA');
