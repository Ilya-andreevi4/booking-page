import Logo from "../../assets/logo.svg";
import ContactIcons from "./icons/ContactIcons";
import MediaIcons from "./icons/MediaIcons";
const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer footer__container">
        <div className="footer footer__image">
          <span className="footer footer__atr">
            <a href="https://ru.freepik.com/free-vector/horse-silhouette-mustang-silhouettes-pack_24431069.htm#query=%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%20svg%20%D0%BB%D0%BE%D1%88%D0%B0%D0%B4%D0%B8&position=4&from_view=keyword&track=ais">
              Изображение от NACreative
            </a>
            на Freepik
          </span>
        </div>
      </div>
      <div className="footer footer__box">
        <div className="footer footer__content">
          <a className="box-logo footer__box-logo" target="_blank" href="https://altay-arkadia.ru/">
            <img src={Logo} alt="logo" className="logo footer__logo" />
          </a>
          <div className="footer footer__description">
            <h1 className="footer title footer__title">КОННЫЕ ПОХОДЫ и ТУРЫ ПО ГОРНОМУ АЛТАЮ</h1>
            <h3 className="footer title">1991-{thisYear} © ООО "Аркадия"</h3>
            <h3 className="footer title">Незабываемый летний отдых!</h3>
          </div>
        </div>
        <div className="footer footer__content">
          <MediaIcons />
          <div className="footer footer__links">
            <a className="link footer__box-link" target="_blank" href="https://altay-arkadia.ru/dokumenty/">
              Документы
            </a>
            <a className="link footer__box-link" target="_blank" href="https://altay-arkadia.ru/fotografii">
              Галерея
            </a>
          </div>
          <ContactIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
