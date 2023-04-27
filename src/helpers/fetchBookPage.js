const model = ["text-davinci-002", "gpt-3.5-turbo"];
export const fetchBookPage = async (topic) => {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    body: JSON.stringify({
      prompt: topic,
      model: model[0],
      max_tokens: 500,
      n: 1,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  });

  const data = await response.json();

  return data;
};
