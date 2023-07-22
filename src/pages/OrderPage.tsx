import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChoosenEvent,
  getQuantities,
  getSelectedRate,
} from "../features/selectors";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "../components/InputComponent";
import { useCreateOrderMutation } from "../api/apiSlice";
import { addEventConfirmationCode } from "../features/eventsSlice";

interface OrderPageProps {}

const FormSchema = z.object({
  name: z
    .string({
      required_error: "The username field is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "The username must be 3 characters or more" })
    .max(20, { message: "The username must be 10 characters or less" })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The username must contain only letters, numbers and underscore (_)"
    ),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email. Please enter a valid email address",
    }),
  phone: z.string().min(10).max(14).optional(),
  address: z.string().min(5).optional(),
  cardName: z.string().min(3),
  cardNumber: z.string().min(14).max(16),
  expiration: z.string().min(4).max(5),
  cvv: z.string().min(3).max(3),
});

type DetailsSchemaValues = z.infer<typeof FormSchema>;

type Inputs = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  cardName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
};

export const OrderPage: FC<OrderPageProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedEvent = useSelector(getChoosenEvent);
  const selectedRate = useSelector(getSelectedRate);
  const selectedQuantity = useSelector(getQuantities);
  console.log(selectedEvent);
  useEffect(() => {
    // if (!selectedEvent || !selectedRate || !selectedQuantity) {
    //   navigate("/", { replace: true });
    // }
  }, []);

  const [createOrder] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DetailsSchemaValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      cardName: "",
      cardNumber: "",
      expiration: "",
      cvv: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const goBackHandler = () => {
    navigate(-1);
  };

  const onSubmitForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const [firstName, ...restName] = data.name.split(" ");
      const lastName = restName.join(" ");

      const order = await createOrder({
        rate: selectedRate!,
        quantity: Number(selectedQuantity),
        card: {
          nameOnCard: data.cardName,
          expires: data.expiration,
          number: data.cardNumber,
          cvv: data.cvv,
        },
        user: {
          firstName: firstName,
          lastName: lastName,
          email: data.email,
          phone: data.phone!,
        },
      }).unwrap();
      dispatch(addEventConfirmationCode(order.confirmationCode));

      navigate("/success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <h4>Buying tickets for {selectedEvent?.name}</h4>
      <hr />
      <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <div className="row">
          <div className="col-sm-offset-1 col-sm-10">
            <h4>
              <strong>Your Details</strong>
            </h4>
            <hr />
            <div className="row">
              <div className="col-sm-6">
                <InputComponent
                  label="Name"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </div>
              <div className="col-sm-6">
                <InputComponent
                  label="Email"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>
              <div className="col-sm-6">
                <InputComponent
                  label="Phone"
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </div>
              <div className="col-sm-6">
                <InputComponent
                  label="Address"
                  {...register("address")}
                  error={errors.address?.message}
                />
              </div>
            </div>
            <hr />
            <h4>
              <strong>Payment Details</strong>
            </h4>
            <hr />
            <div className="row">
              <div className="col-xs-12">
                <InputComponent
                  label="Cardholder Name"
                  {...register("cardName")}
                  error={errors.cardName?.message}
                />
              </div>
              <div className="col-sm-6">
                <InputComponent
                  label="Card Number"
                  {...register("cardNumber")}
                  error={errors.cardNumber?.message}
                />
              </div>
              <div className="col-sm-4">
                <InputComponent
                  label="Card Expiration"
                  {...register("expiration")}
                  error={errors.expiration?.message}
                />
              </div>
              <div className="col-sm-2">
                <InputComponent
                  label="CVV"
                  {...register("cvv")}
                  error={errors.cvv?.message}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-3 col-md-offset-2">
            <button
              onClick={goBackHandler}
              className="btn btn-default btn-block btn-lg"
            >
              Back
            </button>
          </div>
          <div className="col-xs-3 col-md-offset-2">
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isSubmitting}
            >
              Pay
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
