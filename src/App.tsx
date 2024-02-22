import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import Generator from "./components/Generator/Generator";
type Props = {};

const App: React.FC = ({}: Props) => {
  return (
    <div className="app">
      <Header />
      <Generator />

      {/* <div className="hero-section">
        <h2 className="hero-section__title">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </h2>
        <div className="hero-section__buttons-action__wrapper">
          <Button
            variant="outlined"
            sx={{ color: "#000", borderColor: "#000" }}
            size="large"
          >
            Boutique
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#000" }}
            size="large"
          >
            Créer
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default App;
