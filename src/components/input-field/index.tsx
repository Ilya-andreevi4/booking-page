import { useEffect, useState } from "react";

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  regex: RegExp;
  className: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorText?: string;
  required?: boolean;
}

export default function InputField({ ...props }: InputFieldProps) {
  const { id, type, name, className, placeholder, value, regex, required, errorText, onChange } = props;
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const isValid = () => {
    const regexError: boolean = !!regex && !new RegExp(regex).test(currentValue || "");
    setError(required ? !currentValue || regexError : !!currentValue && regexError);
    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCurrentValue(e.target.value);
    onChange(e);
  };

  useEffect(() => {
    isValid();
  }, [value]);

  return (
    <label className={"label " + (isDirty && error ? "label_error" : "")}>
      {isDirty && error ? <p className="error_text">{errorText}</p> : ""}
      <input
        id={id}
        placeholder=" "
        value={currentValue}
        type={type}
        name={name}
        onClick={() => setIsDirty(true)}
        onChange={(e) => handleChange(e)}
        className={"input " + className + (isDirty && error ? " input_error" : "")}
      ></input>
      <p className={"placeholder " + (isDirty && error ? " placeholder_error" : "")}>{placeholder}</p>
    </label>
  );
}
