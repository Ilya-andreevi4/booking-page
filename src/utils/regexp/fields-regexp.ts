import NamePages from "../../types/steps-names";
const { DATE_STEP, PARTICIPANTS, CONTACT_STEP } = NamePages;

const REGULAR_EXPRESSON = {
  EMAIL: /^(.+)@(.+){2,}\.(.+)$/,
  NAME: /^(?=.{1,20}$)[A-ZА-Яa-zа-я\-ъ\s]*$/,
  PHONE: /^((8|\+7|7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{9,10}$/,
  DATE: /^(?:(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d|(?:19|20)\d\d([\/.-])(?:0[1-9]|1[012])([\/.-])(?:0[1-9]|[12]\d|3[01]))$/,
  MESSAGE: /^[\w\W]*$/,
};

const REGEX_ERRORS = {
  EMAIL: "E-mail введен не корректно",
  NAME: "Это поле обязательно. Допускаются только буквы. От 1 до 20 символов.",
  PHONE: "Введите корректный номер телефона",
  DATE: "Введите дату корректно",
  MESSAGE: "Это поле не должно быть пустым",
};

const EMAIL: FieldsProps = {
  id: "email",
  type: "email",
  name: "email",
  placeholder: "Электронная почта*",
  regex: REGULAR_EXPRESSON.EMAIL,
  errorText: REGEX_ERRORS.EMAIL,
};

const MIDDLE_NAME: FieldsProps = {
  id: "middle name",
  type: "text",
  name: "middle name",
  placeholder: "Отчество",
  regex: REGULAR_EXPRESSON.NAME,
  errorText: REGEX_ERRORS.NAME,
};

const FIRST_NAME: FieldsProps = {
  id: "first name",
  type: "text",
  name: "first name",
  placeholder: "Имя*",
  regex: REGULAR_EXPRESSON.NAME,
  errorText: REGEX_ERRORS.NAME,
};

const LAST_NAME: FieldsProps = {
  id: "last name",
  type: "text",
  name: "last name",
  placeholder: "Фамилия*",
  regex: REGULAR_EXPRESSON.NAME,
  errorText: REGEX_ERRORS.NAME,
};

const DATE: FieldsProps = {
  id: "date",
  type: "date",
  name: "date",
  placeholder: "Дата заезда",
  regex: REGULAR_EXPRESSON.DATE,
  errorText: REGEX_ERRORS.DATE,
};
const BIRTHDAY: FieldsProps = {
  id: "birthday",
  type: "date",
  name: "birthday",
  placeholder: "Дата рождения*",
  regex: REGULAR_EXPRESSON.DATE,
  errorText: REGEX_ERRORS.DATE,
};

const DAYS: FieldsProps = {
  id: "days",
  type: "select",
  name: "days",
  placeholder: "Количество дней",
  regex: REGULAR_EXPRESSON.MESSAGE,
  errorText: REGEX_ERRORS.MESSAGE,
};

const CITY: FieldsProps = {
  id: "city",
  type: "text",
  name: "city",
  placeholder: "Город",
  regex: REGULAR_EXPRESSON.MESSAGE,
  errorText: REGEX_ERRORS.MESSAGE,
};

const SELECT: FieldsProps = {
  id: "number",
  type: "select",
  name: "number",
  placeholder: "Количество участников",
  regex: REGULAR_EXPRESSON.MESSAGE,
  errorText: REGEX_ERRORS.MESSAGE,
};

const PHONE: FieldsProps = {
  id: "phone",
  type: "tel",
  name: "phone",
  placeholder: "Телефон*",
  regex: REGULAR_EXPRESSON.PHONE,
  errorText: REGEX_ERRORS.PHONE,
};

const STEP_FIELDS = {
  [DATE_STEP]: [DATE, DAYS, SELECT],
  [PARTICIPANTS]: [LAST_NAME, FIRST_NAME, MIDDLE_NAME, BIRTHDAY],
  [CONTACT_STEP]: [LAST_NAME, FIRST_NAME, PHONE, EMAIL, CITY],
};

export default STEP_FIELDS;
