import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setContact, setParticipants } from "../../store/slices/registration-slice";
import TourBlock from "./steps/TourBlock";
import ParticipantsBlock from "./steps/ParticipantsBlock";
import ContactBlock from "./steps/ContactBlock";
import SubmitBlock from "./steps/SubmitBlock";

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { step, route, participants, numParticipants, contact, comment } = useSelector(
    (state: RootState) => state.registration
  );
  const [formData, setFormData] = React.useState<IFormData>({
    route: route,
    participants: participants,
    contact: contact,
    comment: comment,
  });
  const [participantForms, setParticipantForms] = React.useState(
    Array.from({ length: numParticipants }, (_, idx) => participants[idx])
  );

  const handleCheckValue = (participant: Participant, name: string) => {
    if (name === "last name") {
      return participant.lastName;
    }
    if (name === "first name") {
      return participant.firstName;
    }
    if (name === "middle name") {
      return participant.middleName;
    }
    if (name === "birthday") {
      return participant.birthDay;
    }
    return "";
  };

  const handleParticipantChange = (index: number, field: string, value: string) => {
    setParticipantForms((forms) => forms.map((form, idx) => (idx === index ? { ...form, [field]: value } : form)));
    dispatch(setParticipants(participantForms));
  };

  const checkHandleChange = (id: number, e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const currentVal = e.target.value;
    if (name === "first name") {
      return handleParticipantChange(id, "firstName", currentVal);
    }
    if (name === "last name") {
      return handleParticipantChange(id, "lastName", currentVal);
    }
    if (name === "middle name") {
      return handleParticipantChange(id, "middleName", currentVal);
    }
    if (name === "birthday") {
      return handleParticipantChange(id, "birthDay", currentVal);
    } else
      return console.error(
        "Не найдено значение обозначенного инпута... Ошибка находиться в registration-page.tsx, в функции checkHandleChange."
      );
  };

  useEffect(() => {
    setParticipantForms(
      Array.from({ length: numParticipants }, (_, idx) => ({
        ...participants[idx],
      }))
    );
  }, [numParticipants]);

  useEffect(() => {
    setFormData({
      route: route,
      participants: participants,
      contact: contact,
      comment: comment,
    });
  }, [route, participants, contact, comment]);

  const handleParticipantSubmit = () => {
    dispatch(setParticipants(participantForms));
    dispatch(nextStep());
  };

  const handleContactSubmit = (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    city: string
  ) => {
    dispatch(setContact({ firstName, lastName, phoneNumber, email, city }));
    dispatch(nextStep());
  };

  switch (step) {
    case 1:
      return <TourBlock />;
    case 2:
      return (
        <ParticipantsBlock
          participants={participantForms}
          checkHandleChange={checkHandleChange}
          handleCheckValue={handleCheckValue}
          handleParticipantSubmit={handleParticipantSubmit}
        />
      );
    case 3:
      return <ContactBlock handleContactSubmit={handleContactSubmit} />;
    case 4:
      return <SubmitBlock formData={formData} setFormData={setFormData} />;
    default:
      return null;
  }
};

export default RegistrationPage;
