import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const LOCAL_STATE = {
  step: 'current-step',
  mode: 'current-mode',
  route: 'current-route',
  numParticipants: 'number-participants',
  participants: 'participants-info',
  contact: 'contact-info',
  comment: 'comment-info',
}

const initialState: RegistrationState = {
  step: Number(localStorage.getItem(LOCAL_STATE.step) ?? '1'),
  mode: (localStorage.getItem(LOCAL_STATE.mode) as Mode||null) ?? 'default',
  route: JSON.parse(localStorage.getItem(LOCAL_STATE.route) ??JSON.stringify(
    {
      date: '2024-06-08', 
      days: 5
    }
  )),
  numParticipants: Number(localStorage.getItem(LOCAL_STATE.numParticipants) ?? '1'),
  participants: JSON.parse(localStorage.getItem(LOCAL_STATE.participants) ?? JSON.stringify(
    [
      { 
        firstName: "", 
        middleName: "",
        lastName: "",
        birthDay: "",
      },
    ]
  )),
  contact: JSON.parse(localStorage.getItem(LOCAL_STATE.contact) ?? JSON.stringify(
    {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      city: "",
    }
  )),
  comment: localStorage.getItem(LOCAL_STATE.comment) ?? "",
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
      localStorage.setItem(LOCAL_STATE.step, JSON.stringify(state.step))
    },

    prevStep: (state) => {
      state.step -= 1;
      localStorage.setItem(LOCAL_STATE.step, JSON.stringify(state.step))
    },

    setRoute: (state, action: PayloadAction<Route>) => {
      state.route = action.payload;
      localStorage.setItem(LOCAL_STATE.route, JSON.stringify(action.payload))
    },

    addParticipant: (state, action: PayloadAction<Participant>) => {
      state.participants.push(action.payload);
      localStorage.setItem(LOCAL_STATE.participants, JSON.stringify(state.participants))
    },

    setParticipants: (state, action: PayloadAction<Participant[]>) => {
      state.participants = action.payload;
      localStorage.setItem(LOCAL_STATE.participants, JSON.stringify(action.payload))
    },

    setNumParticipants: (state, action: PayloadAction<number>) => {
      state.numParticipants = action.payload;
      localStorage.setItem(LOCAL_STATE.numParticipants, JSON.stringify(action.payload))
    },

    setContact: (state, action: PayloadAction<Contact>) => {
      state.contact = action.payload;
      localStorage.setItem(LOCAL_STATE.contact, JSON.stringify(action.payload))
    },

    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
      localStorage.setItem(LOCAL_STATE.comment, action.payload)
    },

    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
      localStorage.setItem(LOCAL_STATE.mode, JSON.stringify(action.payload))
    },
  },
});

export const {
  nextStep,
  setRoute,
  setMode,
  addParticipant,
  setParticipants,
  setNumParticipants,
  setContact,
  setComment,
  prevStep,
} = registrationSlice.actions;

export default registrationSlice.reducer;
