import "./Home.css";
import logo from "../../images/logo.svg";

const Home = () => {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
      </header>
    </div>
  );
};

export { Home };
