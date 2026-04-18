import Header from "../components/Header";
import Card from "../components/Card";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <Header />

      <main className="home-shell">
        <Card />
      </main>
    </div>
  );
}

export default Home;
