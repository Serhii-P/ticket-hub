import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetEventResponseDto } from './dto/GetEvents'
import { config } from '../core/config'
import { GetSingleEventResponseDto } from './dto/GetSingleEvent'
import { GetSectorResponseDto } from './dto/GetSector'
import { GetRateResponseDto } from './dto/GetRates'
import { CreateOrderRequestDto } from './dto/CreateOrderRequest'
import { CreateOrderResponseDto } from './dto/CreateOrderResponse'

// Define a service using a base URL and expected endpoints <GetEventResponseDto, string>
export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.api.host }),
  endpoints: (builder) => ({
    getAllEvents: builder.query<GetEventResponseDto, unknown>({
      query: () => `/api/events`,
    }),
    getSingleEvent: builder.query<GetSingleEventResponseDto, number>({
      query: (eventId) => `/api/event/${eventId}`
    }),
    getEventSector: builder.query<GetSectorResponseDto, number>({
      query: (eventId) => `/api/eventDate/${eventId}/sectors`
    }),
    getEventRates: builder.query<GetRateResponseDto, number>({
      query: (sectorId) => `/api/sectors/${sectorId}/rates`
    }),
    createOrder: builder.mutation<CreateOrderResponseDto, Partial<CreateOrderRequestDto>>({
      query(body) {
        return {
          url: `/api/order`,
          method: 'POST',
          body,
        }
      },
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllEventsQuery, useGetSingleEventQuery, 
  useLazyGetEventSectorQuery, useLazyGetEventRatesQuery, useCreateOrderMutation } = eventsApi