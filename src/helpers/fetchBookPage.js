export const fetchBookPage = async (topic, page, curText = "") => {
  console.log(topic, page, curText);
  const response = await fetch("https://ai-books-backend.onrender.com/page", {
    method: "POST",
    body: JSON.stringify({
      topic,
      page,
      curText,
    }),
  });
  const data = await response.json();

  return data;
};
