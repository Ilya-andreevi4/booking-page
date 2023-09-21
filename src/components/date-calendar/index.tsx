import { useSelector } from "react-redux";
import dates from "../../utils/date/dates";
import { useDispatch } from "react-redux";
import { setRoute } from "../../store/slices/registration-slice";

interface Param {
  days: number;
  selectRef: any;
}

const months = ["Июнь", "Июль", "Август", "Сентябрь"];

const DateCalendar = (params: Param) => {
  const { route } = useSelector((state: RootState) => state.registration);
  const { days, selectRef } = params;
  const date = route.date;
  const visualDate = date.split("-").reverse().join(".");
  const dispatch = useDispatch();

  const handleChangeDate = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    value?: string
  ) => {
    e.preventDefault();
    const currentDate = value || e.target.value;
    dispatch(setRoute({ ...route, date: currentDate }));
  };

  const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (!value) {
      dispatch(setRoute({ ...route, date: value }));
    } else {
      const currentDate = value.split(".").reverse().join("-");
      handleChangeDate(e, currentDate);
    }
  };

  return (
    <label>
      <h3 className="text title_text">Дата начала заезда:</h3>
      {days !== 0 ? (
        <select
          name="date"
          className="select-num select"
          size={1}
          ref={selectRef}
          value={date.split("-").reverse().join(".")}
          defaultValue={visualDate}
          onChange={(e) => handleChangePeriod(e)}
        >
          <option value="" key={-1}>
            Выберите дату
          </option>
          {months.map((month, idx) => {
            return (
              <optgroup key={idx} label={month}>
                {dates.map((date, index) => {
                  if (date.days === days && date.month === month) {
                    if (date.periods.length > 0) {
                      return date.periods.map((period, idx) => {
                        return (
                          <option value={period} key={`${index}-${idx}`}>
                            {period}
                          </option>
                        );
                      });
                    } else
                      return (
                        <option disabled key={index}>
                          Туров на этот период нет
                        </option>
                      );
                  } else return;
                })}
              </optgroup>
            );
          })}
        </select>
      ) : (
        <input
          type="date"
          id="start"
          name="date"
          className="select-num select"
          value={date}
          data-date-format="DD MMMM YYYY"
          onChange={(e) => handleChangeDate(e)}
          min="2024-06-08"
          max="2024-09-20"
        ></input>
      )}
    </label>
  );
};

export default DateCalendar;
