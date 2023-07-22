import { useGetSingleEventQuery } from "../api/apiSlice";
import { Link, useParams } from "react-router-dom";
import { EventCard } from "./EventCard";
import { EventForm } from "./EventForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addChoosenEvent,
  addChoosenVenue,
  cleanEventOrderState,
} from "../features/eventsSlice";
import { getChoosenEvent } from "../features/selectors";

export const EventDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleEventQuery(Number(id));
  const dispatch = useDispatch();
console.log(data);
  useEffect(() => {
    if (data) {
      dispatch(
        addChoosenEvent({ id: data.id, name: data.name, thumb: data.thubm })
      );
      dispatch(
        addChoosenVenue({
          id: data.venue.id,
          name: data.venue.name,
          address: data.venue.address,
        })
      );
    }
  }, [data, dispatch]);

  // const choosenEvent = useSelector(getChoosenEvent);
  // useEffect(() => {
  //   const initEventPage = async () => {
  //     await dispatch(cleanEventOrderState());
  //   };
  //   if (id !== choosenEvent?.id) {
  //     initEventPage();
  //   }
  // }, [id, choosenEvent]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{`Something went wrong, ${error}`}</p>;
  }

  return (
    <div className="container">
      <h3>
        <strong>
          <Link to="/">Challenge Tickets</Link>
        </strong>
      </h3>
      <hr />
      <h4>Event name: {data?.name} </h4>
      <hr />
      <img src={data?.image} width="100%" alt={data?.name} />
      <hr />
      <h5>
        <strong>Buy Tickets</strong>
      </h5>
      <EventForm />
      <hr />
      <div className="row">
        <div className="col-sm-7">
          <h4>
            <strong>Event Description</strong>
          </h4>
          <p>{data?.description}</p>
        </div>
        <div className="col-sm-offset-1 col-sm-4">
          <h4>
            <strong>Where</strong>
          </h4>
          <p>
            <strong>{data?.venue.name}</strong>
            <br />
            {data?.venue.address}
          </p>
        </div>
      </div>
      <hr />
      <h4>Similar Events</h4>
      <hr />
      <div className="row">
        {data?.similarEvents.map((item) => (
          <EventCard eventId={item.id} thumb={item.thumb} key={item.id} />
        ))}
      </div>
    </div>
  );
};
