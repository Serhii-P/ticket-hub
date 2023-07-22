import { FC, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleEventQuery,
  useLazyGetEventRatesQuery,
  useLazyGetEventSectorQuery,
} from "../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuantities,
  getSelectedDate,
  getSelectedRate,
  getSelectedSector,
  getTicketQuantity,
} from "../features/selectors";
import { GetSectorResponseDto } from "../api/dto/GetSector";
import {
  addDate,
  addQuantity,
  addRate,
  addSector,
  setTicketQuantity,
} from "../features/eventsSlice";

interface EventFormProps {}

export const EventForm: FC<EventFormProps> = ({}) => {
  const { id } = useParams();
  const { data } = useGetSingleEventQuery(Number(id));
  const [sectorTrigger, sectors] = useLazyGetEventSectorQuery();
  const [rateTrigger, rates] = useLazyGetEventRatesQuery();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const eventDateValues = useSelector(getSelectedDate);
  const eventSectorValue = useSelector(getSelectedSector);
  const eventRate = useSelector(getSelectedRate);
  const eventSector = sectors ? (sectors.data as GetSectorResponseDto) : [];
  const quantities = useSelector(getQuantities);
  const ticketQuantities = useSelector(getTicketQuantity);
  const dateChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = Number(event.target.value);
    const eventDate = event.target.options[event.target.selectedIndex].text;
    if (eventId) {
      dispatch(addDate({ id: eventId, date: eventDate }));
      sectorTrigger(eventId);
    } else {
      dispatch(addDate(null));
    }
    dispatch(addSector(null));
    dispatch(addRate(null));
    dispatch(addQuantity(null));
  };

  const sectorChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sectorId = Number(event.target.value);
    const sectorName = event.target.options[event.target.selectedIndex].text;
    dispatch(addSector({ id: sectorId, name: sectorName }));

    if (!sectorId) {
      return;
    }
    dispatch(addRate(null));
    dispatch(addQuantity(null));

    rateTrigger(sectorId);
  };

  const ratesChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const rateId = Number(event.target.value);
    dispatch(addRate(rateId));

    const selectedRate = rates?.data?.find((item) => item.id === rateId);

    dispatch(
      addQuantity({
        id: rateId,
        max: selectedRate?.max || 0,
        price: selectedRate?.price || 0,
      })
    );

    if (!rateId) {
      dispatch(addQuantity(null));
    }
  };

  const quantityOptions = useMemo(() => {
    return new Array(quantities?.max || 0).fill(0);
  }, [quantities?.max]);

  const quantityChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const quantityId = Number(event.target.value) || 0;
    if (quantities) {
      dispatch(
        addQuantity({
          ...quantities,
          id: quantityId,
        })
      );
      dispatch(setTicketQuantity(quantityId));
    }
  };

  const submitEventHandler = () => {
    navigate("/order");
  };

  return (
    <div className="row">
      <div className="col-sm-3">
        <div className="form-group">
          <select
            className="form-control"
            onChange={dateChangeHandler}
            value={String(eventDateValues?.id)}
          >
            <option value="null">Date</option>
            {data?.dates.map((date) => (
              <option value={date.id} key={date.id}>
                {date.date}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <select
            className="form-control"
            onChange={sectorChangeHandler}
            value={String(eventSectorValue?.id)}
            disabled={eventDateValues?.id ? false : true}
          >
            <option value="">Sector</option>
            {eventSector &&
              eventSector?.map((sector) => (
                <option value={sector.id} key={sector.id}>
                  {sector.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="col-sm-2">
        <div className="form-group">
          <select
            className="form-control"
            onChange={ratesChangeHandler}
            value={String(eventRate)}
            disabled={eventSectorValue?.id ? false : true}
          >
            <option value="">Rate</option>
            {rates.data?.map((rate) => (
              <option value={rate.id} key={rate.id}>
                {rate.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-sm-2">
        <div className="form-group">
          <select
            className="form-control"
            onChange={quantityChangeHandler}
            disabled={eventRate && eventRate > 0 ? false : true}
            value={String(ticketQuantities)}
          >
            <option value="">Quantity</option>
            {quantityOptions.map((_, index) => (
              <option value={index + 1} key={`quatity-${index}`}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-sm-2">
        <button
          className="btn btn-primary btn-block"
          onClick={submitEventHandler}
        >
          BUY
        </button>
      </div>
    </div>
  );
};
