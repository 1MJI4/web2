import Cinema from "./components/Cinema";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";
import { MoviesProps } from "./components/Type";


const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const moviesCinema1 = [
    {
      title: "HAIKYU-THE DUMPSTER BATTLE",
      director: "Susumu Mitsunaka",
    },
    {
      title: "GOODBYE JULIA",
      director: "Mohamed Kordofani",
    },
    {
      title: "INCEPTION",
      director: "Christopher Nolan",
    },
    {
      title: "PARASITE",
      director: "Bong Joon-ho",
    },
  ];
  const cinema2Name = "UGC Toison d'Or";
  const moviesCinema2 = [
    {
      title: "THE WATCHERS",
      director: "Ishana Night Shyamalan",
    },
    {
      title: "BAD BOYS: RIDE OR DIE",
      director: "Adil El Arbi, Bilall Fallah",
    },
    {
      title: "TENET",
      director: "Christopher Nolan",
    },
    {
      title: "THE IRISHMAN",
      director: "Martin Scorsese",
    },
  ]; 

  return (
    <div>
      
        <Header urlLogo="https://www.ugc.be/ugc-logo.png">
          <h1>UGC Cinemas</h1>
        </Header>

      <Cinema name={cinema1Name} movies= {moviesCinema1} />

      <Cinema name={cinema2Name} movies={moviesCinema2} />
      <Footer urlLogo="https://www.ugc.be/ugc-logo.png">
        <div>
          <h1>UGC Cinemas</h1>
        </div>
      </Footer>
    </div>
  );
};

export default App;
