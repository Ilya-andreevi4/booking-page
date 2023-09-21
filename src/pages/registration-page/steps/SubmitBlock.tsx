import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import submitForm from "../../../controllers/FormController";
import { prevStep, setComment } from "../../../store/slices/registration-slice";
import { useState } from "react";

interface Param {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const SubmitBlock = (params: Param) => {
  const { formData, setFormData } = params;
  const dispatch = useDispatch();
  const { step, route, participants, contact, comment } = useSelector((state: RootState) => state.registration);
  const [isConsent, setIsConsent] = useState(false);
  const handleChangeConsent = () => {
    setIsConsent(!isConsent);
  };

  return (
    <div className="registration-wrapper">
      <h2>{step}/4 Проверьте введенные данные</h2>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${step * 25}%` }} />
      </div>
      <div className="content-box content-box__registration-wrapper">
        <h3 className="text title_text">Дата маршрута:</h3>
        <p className="text">
          {route.date
            ? new Date(route.date).toLocaleString("ru", { year: "numeric", month: "short", day: "numeric" })
            : "не указано"}
          | Количество дней: {route.days === 0 ? "Индивидуальный тур" : route.days}
        </p>
        <h3 className="text title_text">Участники:</h3>
        <ul>
          {participants.map((participant, i) => (
            <li key={i} className="text">
              {i + 1}. {participant.lastName} {participant.firstName} {participant.middleName}
              {", "}
              {participant.birthDay
                ? new Date(participant.birthDay).toLocaleString("ru", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }) + " г.р."
                : ""}
            </li>
          ))}
        </ul>
        <h3 className="text title_text">Контактная информация:</h3>
        <ul>
          <li className="text">
            {contact.lastName} {contact.firstName}
          </li>
          <li className="text">Телефон: {contact.phoneNumber}</li>
          <li className="text">Эл.почта: {contact.email} </li>
          <li className="text">Город: {contact.city}</li>
        </ul>
      </div>
      <form className="comment__form">
        <h3>Дополнительный комментарий:</h3>
        <label className="comment__label">
          <textarea
            placeholder="Что еще нам нужно знать о Вас?"
            className="comment__area"
            value={comment}
            onChange={(event) => dispatch(setComment(event.target.value))}
          />
        </label>
      </form>
      <label className="checkbox__label">
        <h3>
          <input type="checkbox" required name="agreement" onChange={handleChangeConsent} className="checkbox__input" />
          Cогласие на обработку персональных данных
        </h3>
        <p className="description">
          Нажимая на кнопку, Вы даёте{" "}
          <a className="link" href="https://altay-arkadia.ru/politika/" target="_blank">
            согласие на сбор и обработку ваших персональных данных
          </a>
        </p>
      </label>
      <div className="button-group">
        {step > 1 && (
          <button className="button button_second" type="button" onClick={() => dispatch(prevStep())}>
            Назад
          </button>
        )}
        <button
          className="button"
          type="submit"
          disabled={!isConsent}
          onClick={async (e) => {
            e.preventDefault();
            setFormData({
              route: route,
              participants: participants,
              contact: contact,
              comment: comment,
            });
            await submitForm(formData, dispatch);
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default SubmitBlock;
