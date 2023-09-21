import { useSelector } from "react-redux";
import { ContactForm } from "../../../components/contact-form";

interface Param {
  handleContactSubmit: (firstName: string, lastName: string, phoneNumber: string, email: string, city: string) => void;
}

const ContactSetup = (params: Param) => {
  const { handleContactSubmit } = params;
  const { step } = useSelector((state: RootState) => state.registration);

  return (
    <div className="registration-wrapper">
      <h2>{step}/4 Укажите контактные данные для связи</h2>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${step * 25}%` }} />
      </div>
      <ContactForm onSubmit={handleContactSubmit} />
      <p className="description">
        <span className="bold">
          Важно указать правильный адрес электронной почты - ответ на заявку придет на e-mail.
        </span>
        <br />
        Если не получили ответ в течение 48 часов после отправки заявки, первым делом проверьте спам.
        <br />
        Если письма нет, напишите, пожалуйста, напрямую на нашу почту
        <a className="link" href="mailto:ivan-altay@mail.ru?body=Здравствуйте, турбаза Аркадия!" target="_blank">
          {" "}
          ivan-altay@mail.ru{" "}
        </a>
        или позвоните. <br />
        Телефоны для связи:
        <a className="link" href="tel:+79122490443">
          +7 (912) 249-04-43
        </a>
        ,
        <a className="link" href="tel:+79058058517">
          +7 (905) 805-85-17
        </a>
        .
      </p>
    </div>
  );
};

export default ContactSetup;
