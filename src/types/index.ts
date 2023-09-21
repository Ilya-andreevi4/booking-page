interface Participant {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDay: string;
}

interface NavLink {
  title: string;
  url: string;
}

interface Route {
  date: string;
  days: number;
}

interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
}

interface IFormData {
  route: Route;
  participants: Participant[];
  contact: Contact;
  comment: string;
}

type Mode = "default" | "error" | "success" | "loading";

interface RootState {
  registration: RegistrationState;
}

interface RegistrationState {
  step: number;
  mode: Mode;
  route: Route;
  numParticipants: number;
  participants: Participant[];
  contact: Contact;
  comment: string;
}

interface FieldsProps {
  id: string;
  type: "date" | "email" | "file" | "password" | "number" | "tel" | "text" | "select";
  name: string;
  regex: RegExp;
  errorText: string;
  placeholder: string;
}
