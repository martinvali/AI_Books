export const fetchBookImage = async (text) => {
  const response = await fetch("https://ai-books-backend.onrender.com/pic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
    }),
  });
  const data = await response.json();

  return data;
};
