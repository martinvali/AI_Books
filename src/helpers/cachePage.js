export function cachePage(pageNumber, text) {
  let pages = JSON.parse(localStorage.getItem("pages"));

  if (pages) {
    pages[pageNumber] = text;
    localStorage.setItem("pages", JSON.stringify(pages));
  } else {
    pages = {
      [pageNumber]: text,
    };
    localStorage.setItem("pages", JSON.stringify(pages));
  }
}
