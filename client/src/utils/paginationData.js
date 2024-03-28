export const paginationData = (currentPage, totalItems) => {
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return { startIndex, endIndex, totalPages, itemsPerPage };
};
