import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import STEP_FIELDS from "../../utils/regexp/fields-regexp";
import InputField from "../input-field";
import { LOCAL_STATE, prevStep } from "../../store/slices/registration-slice";
import { useDebounce } from "../../utils/useDebounce";

interface Props {
  onSubmit: (firstName: string, lastName: string, phoneNumber: string, email: string, city: string) => void;
}

export const ContactForm = ({ onSubmit }: Props) => {
  const { contact } = useSelector((state: RootState) => state.registration);
  const dispatch = useDispatch();
  const [user, setUser] = useState(contact);
  const [isValid, setIsValid] = useState(false);
  const debouncedValue = useDebounce<Contact>(user, 500);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, city, email, lastName, phoneNumber } = user;
    onSubmit(firstName, lastName, phoneNumber, email, city);
  };

  const handleCheckValue = (id: string) => {
    switch (id) {
      case "email":
        return user.email;

      case "first name":
        return user.firstName;

      case "last name":
        return user.lastName;

      case "phone":
        return user.phoneNumber;

      case "city":
        return user.city;

      default:
        return "";
    }
  };

  const checkHandleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const currentVal = e.target.value;
    switch (id) {
      case "email":
        return setUser((prev) => {
          return { ...prev, email: currentVal };
        });

      case "first name":
        return setUser((prev) => {
          return { ...prev, firstName: currentVal };
        });

      case "last name":
        return setUser((prev) => {
          return { ...prev, lastName: currentVal };
        });

      case "phone":
        return setUser((prev) => {
          return { ...prev, phoneNumber: currentVal };
        });

      case "city":
        return setUser((prev) => {
          return { ...prev, city: currentVal };
        });
    }
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STATE.contact, JSON.stringify(user));
    if (user.firstName && user.lastName && user.phoneNumber && user.email) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [debouncedValue]);

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {STEP_FIELDS["contact"].map((field, key) => {
        return (
          <InputField
            {...field}
            key={key}
            className="input_text"
            required={true}
            value={handleCheckValue(field.id)}
            onChange={(event) => checkHandleChange(event, field.id)}
          ></InputField>
        );
      })}
      <div className="button-group">
        <button className="button button_second" type="button" onClick={() => dispatch(prevStep())}>
          Назад
        </button>
        <button className="button" disabled={!isValid} type="submit">
          Дальше
        </button>
      </div>
    </form>
  );
};
