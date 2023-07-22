import { FC } from "react";
import { useGetAllEventsQuery } from "../api/apiSlice";
import { EventCard } from "../components/EventCard";
import { Link } from "react-router-dom";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  const { data, error, isLoading } = useGetAllEventsQuery({});

  if (isLoading) {
    return <p>Loading</p>;
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
      <h4>Select an event</h4>
      <hr />
      <div className="row">
        {data?.map((item) => (
          <EventCard eventId={item.id} thumb={item.thumb} key={item.id}/>
        ))}
      </div>
    </div>
  );
};
