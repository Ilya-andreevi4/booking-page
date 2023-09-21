import Logo from "../../assets/logo.svg";
import Nav from "../nav";

const Header = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <a className="box-logo box-logo__header" target="_blank" href="https://altay-arkadia.ru/">
          <img src={Logo} alt="logo" className="logo logo__header" />
        </a>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
