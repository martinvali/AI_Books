import { useEffect, useState } from "react";
import { fetchBookPage } from "../helpers/fetchBookPage";

export const Main = () => {
  const [data, setData] = useState();
  const [topic, setTopic] = useState();
  const [pagesCount, setPagesCount] = useState(1);

  const handleSubmit = (e) => {
    fetchBookPage(topic, pagesCount).then((data) =>
      setData(data.choices[0].text)
    );
  };

  return (
    <main>
      <section className="main-section">
        <div>
          <h1>Ai Books</h1>
          <p>Generate an innovative children’s book of your preference.</p>
        </div>
        <div>
          <p>img here</p>
          <p>pagesCount: {pagesCount}</p>
          <p>topic: {topic}</p>
        </div>
      </section>
      <div>Data here: {data}</div>
      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <label htmlFor="topic">Topic</label>
          <input
            type="text"
            name="topic"
            id="topic"
            value={topic}
            required
            onChange={(e) => setTopic(e.target.value)}
          />

          <label htmlFor="length">Pages</label>
          <input
            type="number"
            name="length"
            id="length"
            min={1}
            onChange={(e) => setPagesCount(e.target.value)}
            value={pagesCount}
          />

          <button type="submit">Generate</button>
        </form>
      </section>
    </main>
  );
};
