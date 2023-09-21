import Message from "../../../assets/message.svg";
import Phone from "../../../assets/phone.svg";

export default function ContactIcons() {
  return (
    <div className="footer footer__icons footer__icons_contact">
      <a className="box-icon footer__box-icon footer__box-icon_phone" target="_blank" href="tel:+79058058517">
        <img src={Phone} alt="Позвонить" className="logo footer__icon footer__icon_phone" />
      </a>
      <a
        className="box-icon footer__box-icon footer__box-icon_mail"
        target="_blank"
        href="mailto:ivan-altay@mail.ru?body=Здравствуйте, команда турбазы Аркадия!"
      >
        <img src={Message} alt="Написать на почту" className="logo footer__icon footer__icon_mail" />
      </a>
    </div>
  );
}
