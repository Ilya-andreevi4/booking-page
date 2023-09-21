import { useDispatch } from "react-redux";
import { nextStep, setNumParticipants, setRoute } from "../../../store/slices/registration-slice";
import { useSelector } from "react-redux";
import DateCalendar from "../../../components/date-calendar";
import { useRef } from "react";

const TourSetup = () => {
  const { step, numParticipants, route } = useSelector((state: RootState) => state.registration);
  const selectRef = useRef(null as HTMLSelectElement | null);
  const days = route.days;
  const dispatch = useDispatch();

  const handleRouteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(nextStep());
  };

  const handleChangeDays = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const currentDays = Number(e.target.value);
    dispatch(setRoute({ ...route, days: currentDays }));
  };

  return (
    <div className="registration-wrapper">
      <h2>{step}/4 Выбор маршрута и даты заезда</h2>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${step * 25}%` }} />
      </div>
      <form onSubmit={handleRouteSubmit}>
        <label>
          <h4 className="text title_text">Количество дней:</h4>
          <select name="days" className="select-num select" value={days} onChange={(e) => handleChangeDays(e)}>
            <option key={5} value={5}>
              5
            </option>
            <option key={7} value={7}>
              7
            </option>
            <option key={10} value={10}>
              10
            </option>
            <option key={15} value={15}>
              15
            </option>
            <option key={0} value={0}>
              Индивидуальный тур
            </option>
          </select>
        </label>
        <DateCalendar days={days} selectRef={selectRef} />
        <label>
          <h4 className="text title_text">Количество участников:</h4>
          <select
            name="numParticipants"
            className="select-num select"
            defaultValue={numParticipants}
            size={1}
            onChange={(e) => {
              e.preventDefault();
              dispatch(setNumParticipants(Number(e.target.value)));
            }}
          >
            {Array.from({ length: 25 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <div className="button-group">
          <button type="submit" className="button" disabled={selectRef.current?.value === ""}>
            Следующий шаг
          </button>
        </div>
      </form>
      <p className="description">
        Если на вашу дату нет тура, то в "Количество дней" укажите Индивидуальный тур, а после этого укажите желаемую
        дату начала тура.
      </p>
      <br />
      <p>Если вы бронируете наш тур впервые, ознакомьтесь, пожалуйста, со страницами </p>
      <a className="link" target="_blank" href="https://altay-arkadia.ru/poleznaya-informaciya/">
        Полезное
      </a>
      <a className="link" target="_blank" href="https://altay-arkadia.ru/kak-do-nas-dobratsya/">
        Информация об отъезде.
      </a>
    </div>
  );
};

export default TourSetup;
