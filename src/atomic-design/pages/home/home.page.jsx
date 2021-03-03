import "./home.css";
import logo from "../../../images/logo.svg";

const HomePage = () => {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
      </header>
    </div>
  );
};

export { HomePage };
