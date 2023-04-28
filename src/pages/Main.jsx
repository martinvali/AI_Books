import { useEffect, useState } from "react";
import { fetchBookPage } from "../helpers/fetchBookPage";
import { fetchBookImage } from "../helpers/fetchBookImage";
import { cachePage } from "../helpers/cachePage";
import { getCachedPage } from "../helpers/getCachedPage";
import { Loading } from "../components/Loading";

export const Main = () => {
  const [topic, setTopic] = useState();
  const [pagesCount, setPagesCount] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [curText, setCurText] = useState(undefined);
  const [curImage, setCurImage] = useState(undefined);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("pages");
  }, []);

  const handleSubmit = () => {
    setIsloading(true);
    fetchBookPage(topic, curPage, curText).then((data) => {
      const text = data[0].message.content;
      cachePage(1, text);
      setCurText(text);
      fetchBookImage(text).then((data) => {
        setCurImage(data);
        setIsloading(false);
      });
    });
  };

  const nextPage = () => {
    if (curPage + 1 > pagesCount) {
      return;
    }

    const cachedPage = getCachedPage(curPage + 1);
    if (cachedPage) {
      setCurText(cachedPage);
      setCurPage((curPage) => curPage + 1);
    } else {
      setIsloading(true);
      fetchBookPage(topic, curPage + 1, curText).then((data) => {
        const text = data[0].message.content;
        cachePage(curPage + 1, text);
        setCurText(text);
        setCurPage((curPage) => curPage + 1);
        fetchBookImage(text).then((data) => {
          setCurImage(data);
          setIsloading(false);
        });
      });
    }
  };

  const previousPage = () => {
    if (curPage === 1) {
      return;
    }

    setCurText(getCachedPage(curPage - 1));
    setCurPage((curPage) => curPage - 1);
  };

  return (
    <main>
      <section className="main-section">
        {isLoading && <Loading />}
        <div>
          <h1>Ai Books</h1>
          <p>Generate an innovative children’s book of your preference.</p>
        </div>
        <div>{curImage && <img src={curImage} alt="descriptive image" />}</div>
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
              onChange={(e) => setPagesCount(Number(e.target.value))}
              value={pagesCount}
            />

            <button type="submit">Generate</button>
          </form>
        ) : (
          <>
            <p>{curText}</p>
            <footer>
              {curPage !== 1 && (
                <button onClick={previousPage} disabled={isLoading}>
                  Previous page
                </button>
              )}
              <p>Current page: {curPage} </p>

              {curPage !== pagesCount && (
                <button onClick={nextPage} disabled={isLoading}>
                  Next page
                </button>
              )}
            </footer>
          </>
        )}
      </section>
    </main>
  );
};
