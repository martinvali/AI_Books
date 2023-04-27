export const Main = () => {
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
        <form>
          <label for="topic">Topic</label>
          <input type="text" name="topic" id="topic" />

          <label for="length">Topic</label>
          <input type="number" name="length" id="length" />

          <button type="submit">Generate</button>
        </form>
      </section>
    </main>
  );
};
