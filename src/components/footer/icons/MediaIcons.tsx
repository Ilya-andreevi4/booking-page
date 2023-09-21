import Telegram from "../../../assets/telegram.svg";
import VK from "../../../assets/vk.svg";
import WhatsApp from "../../../assets/whatsapp.svg";
import Instagram from "../../../assets/instagram.svg";

export default function MediaIcons() {
  return (
    <div className="footer footer__icons">
      <a className="box-icon footer__box-icon" target="_blank" href="https://t.me/altai_arkadia">
        <img src={Telegram} alt="Telegram" className="logo footer__icon" />
      </a>
      <a className="box-icon footer__box-icon" target="_blank" href="https://vk.com/altay_arkadia">
        <img src={VK} alt="VK" className="logo footer__icon" />
      </a>
      <a className="box-icon footer__box-icon" target="_blank" href="https://wa.me/79058058517">
        <img src={WhatsApp} alt="WhatsApp" className="logo footer__icon" />
      </a>
      <a className="box-icon footer__box-icon" target="_blank" href="https://www.instagram.com/arkadia_altai">
        <img src={Instagram} alt="Instagram" className="logo footer__icon" />
      </a>
    </div>
  );
}
