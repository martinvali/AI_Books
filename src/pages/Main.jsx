import { useEffect, useState } from "react";
import { fetchBookPage } from "../helpers/fetchBookPage";

export const Main = () => {
  const [topic, setTopic] = useState();
  const [pagesCount, setPagesCount] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [curText, setCurText] = useState(undefined);
  const handleSubmit = () => {
    fetchBookPage(topic, pagesCount, curText).then((data) =>
      setCurText(data[0].message.content)
    );
  };

  const nextPage = () => {
    if (curPage + 1 > pagesCount) {
      return;
    }
    fetchBookPage(topic, curPage, curText).then((data) =>
      setCurText(data[0].message.content)
    );
    setCurPage((curPage) => curPage + 1);
  };

  const previousPage = () => {
    if (curPage === 1) {
      return;
    }

    fetchBookPage(topic, curPage, curText).then((data) =>
      setCurText(data[0].message.content)
    );
    setCurPage((curPage) => curPage - 1);
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
        </div>
      </section>
      <section>
        {!curText ? (
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
        ) : (
          <p>{curText}</p>
        )}
      </section>

      <footer>
        <button onClick={previousPage}>Previous page</button>
        <p>Current page: {curPage} </p>
        <button onClick={nextPage}>Next page</button>
      </footer>
    </main>
  );
};
