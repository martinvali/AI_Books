export function getCachedPage(pageNumber) {
  const pages = JSON.parse(localStorage.getItem("pages"));

  return pages[pageNumber];
}
