import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface EventQuantity {
  id: number;
  max: number;
  price: number;
}

interface EventDate {
  id: number
  date: string
}

interface SectorSlice {
  id: number | null;
  name: string | null;
}

interface Event {
  id: number;
  name: string;
  thumb: string;
}

interface Venue {
  id: number;
  address: string;
  name: string;
}

export interface EventsState {
  date: EventDate | null;
  sector: SectorSlice | null;
  rate: number | null;
  quantity: EventQuantity | null;
  choosenEvent: Event | null;
  eventConfirmation: string | null;
  choosenVenue: Venue | null;
  ticketQuantity: number | null;
}

const initialState: EventsState = {
  date: null,
  sector: null,
  rate: null,
  quantity: null,
  choosenEvent: null,
  eventConfirmation: null,
  choosenVenue: null,
  ticketQuantity: null
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addDate: (state, action: PayloadAction<EventDate | null>) => {
      if(action.payload === null) {
        state.date = null;
        return;
      }
      state.date = {...action.payload};
    },
    addSector: (state, action: PayloadAction<SectorSlice | null>) => {
      if (action.payload === null) {
        state.sector = null;
        return;
      }
      state.sector = { ...action.payload };
    },
    addRate: (state, action: PayloadAction<number | null>) => {
      state.rate = action.payload;
    },
    addQuantity: (state, action: PayloadAction<EventQuantity | null>) => {
      if (action.payload === null) {
        state.quantity = null;
      } else {
        state.quantity = { ...action.payload };
      }
    },
    addChoosenEvent: (state, action: PayloadAction<Event | null>) => {
      if (action.payload === null) {
        state.choosenEvent = null;
        return;
      }
      state.choosenEvent = { ...action.payload };
    },
    addEventConfirmationCode: (state, action: PayloadAction<string | null>) => {
      state.eventConfirmation = action.payload;
    },
    addChoosenVenue: (state, action: PayloadAction<Venue | null>) => {
      if (action.payload === null) {
        state.choosenVenue = null;
        return;
      }
      state.choosenVenue = { ...action.payload };
    },
    setTicketQuantity: (state, action: PayloadAction<number | null>) => {
      state.ticketQuantity = action.payload
    },
    cleanEventOrderState: () => initialState,
  },
});

export const {
  addDate,
  addSector,
  addRate,
  addQuantity,
  addChoosenEvent,
  addEventConfirmationCode,
  addChoosenVenue,
  cleanEventOrderState,
  setTicketQuantity
} = eventsSlice.actions;

export default eventsSlice.reducer;
