import { RootState } from "../store/store";

export const getSelectedDate = (state: RootState) => state.events.date;
export const getSelectedSector = (state: RootState) => state.events.sector;
export const getSelectedRate = (state: RootState) => state.events.rate;
export const getQuantities = (state: RootState) => state.events.quantity;
export const getChoosenEvent = (state: RootState) => state.events.choosenEvent;
export const getConfirmationCode = (state: RootState) => state.events.eventConfirmation;
export const getChoosenVenue = (state: RootState) => state.events.choosenVenue;
export const getTicketQuantity = (state: RootState) => state.events.ticketQuantity;
