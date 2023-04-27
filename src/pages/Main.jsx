import { useEffect, useState } from "react";
import { fetchBookPage } from "../helpers/fetchBookPage";

export const Main = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchBookPage("Write a book in 500 words").then((data) =>
      setData(data.choices[0].text)
    );
  }, []);

  return (
    <main>
      <section className="main-section">
        <div>
          <h1>Ai Books</h1>
          <p>Generate an innovative children’s book of your preference.</p>
        </div>
        <div>
          <p>img here</p>
        </div>
      </section>
      <div>Data here: {data}</div>
      <section>
        <form method="post" action="/netlify/BookPages">
          <label for="topic">Topic</label>
          <input type="text" name="topic" id="topic" />

          <label for="length">Topic</label>
          <input type="number" name="length" id="length" min={1} />

          <button type="submit">Generate</button>
        </form>
      </section>
    </main>
  );
};
