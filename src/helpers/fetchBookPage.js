const model = ["text-davinci-002", "gpt-3.5-turbo"];
export const fetchBookPage = async (topic, pagesCount) => {
  const prompt = `Write a children's book on the topic of ${topic}. It should contain ${pagesCount}. Each page must be between 3 and 6 sentences long.`;
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    body: JSON.stringify({
      prompt,
      model: model[0],
      max_tokens: 2500,
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
