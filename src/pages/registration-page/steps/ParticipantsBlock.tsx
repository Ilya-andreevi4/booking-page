import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "../../../components/input-field";
import { LOCAL_STATE, prevStep } from "../../../store/slices/registration-slice";
import STEP_FIELDS from "../../../utils/regexp/fields-regexp";
import { useSelector } from "react-redux";

interface Param {
  participants: Participant[];
  handleParticipantSubmit: () => void;
  checkHandleChange: (id: number, e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  handleCheckValue: (participant: Participant, name: string) => string;
}

const ParticipantsSetup = (params: Param) => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const { step } = useSelector((state: RootState) => state.registration);
  const { participants, handleParticipantSubmit, checkHandleChange, handleCheckValue } = params;

  const checkValues = () => {
    if (
      participants.every((part) => {
        if (part.lastName && part.firstName && part.middleName && part.birthDay) {
          return true;
        } else false;
      })
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STATE.participants, JSON.stringify(participants));
    checkValues();
  }, [checkHandleChange]);

  return (
    <div className="registration-wrapper">
      <h2>{step}/4 Введите данные участников похода</h2>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${step * 25}%` }} />
      </div>
      <ul className="content-box full_width">
        {participants.map((participant, idx) => (
          <li key={idx} className="participant_list">
            <h3 className="numberCount">{idx + 1}.</h3>
            <div key={idx} className="participant_forms">
              {STEP_FIELDS["participants"].map((field, key) => {
                const fieldValue = handleCheckValue(participant, field.name);
                return (
                  <InputField
                    key={key}
                    {...field}
                    className="input_text"
                    required={true}
                    value={fieldValue}
                    onChange={(event) => checkHandleChange(idx, event, field.name)}
                  ></InputField>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
      <div className="button-group">
        <button type="button" className="button button_second" onClick={() => dispatch(prevStep())}>
          Назад
        </button>
        <button type="button" className="button" onClick={handleParticipantSubmit} disabled={!isValid}>
          Дальше
        </button>
      </div>
      <p className="description">Поставьте прочерк eсли нет отчества.</p>
    </div>
  );
};

export default ParticipantsSetup;
