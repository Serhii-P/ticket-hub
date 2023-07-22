import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getChoosenEvent, getChoosenVenue, getConfirmationCode, getQuantities, getSelectedDate, getSelectedSector } from "../features/selectors";

interface SuccesPageProps {}

export const SuccesPage: FC<SuccesPageProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const event = useSelector(getChoosenEvent);
  const confirmationCode = useSelector(getConfirmationCode);
  const quantity = useSelector(getQuantities);
  const sector = useSelector(getSelectedSector);
  const venue = useSelector(getChoosenVenue);
  const eventDate = useSelector(getSelectedDate);

 const dateValue = new Date(eventDate?.date || 0);
  const evnetDateFormatted = new Intl.DateTimeFormat().format(dateValue);

//   useEffect(() => {
//     if (!event) {
//   navigate("/", {replace: true})
//     }
//   }, [event])

//   useEffect(() => {
// return () => {
//   // dispatch(cleanEventOrderState());
// }
//   }, [])

  console.log(event);
  return (
    <div className="container">
      <h3>
        <strong>
          <Link to="/">Challenge Tickets</Link>
        </strong>
      </h3>
      <hr />
      <div className="jumbotron">
        <h3>
          <strong>Congratulations! Order successful</strong>
        </h3>
        <hr />
        <h5>
          <strong>Order Details</strong>
        </h5>
        <hr />
        <div className="media">
          <div className="media-left">
            <img
              src={event?.thumb}
              width="150"
              className="media-object"
              alt="event"
            />
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              <strong>{event?.name}</strong>
            </h4>
            <strong>Where:</strong> {venue?.name}, {venue?.address}
            <br />
            <strong>When:</strong> {evnetDateFormatted}
            <br />
            <strong>Sector:</strong> {sector?.name}
            <br />
            <strong>Quantity:</strong> {quantity?.id}
            <br />
            <strong>Confirmation Code:</strong>
            {confirmationCode}
          </div>
        </div>
        <hr />
        <div className="text-right">
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/")}>
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};
