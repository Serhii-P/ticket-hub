import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EventDetails } from "./components/EventDetails";
import { OrderPage } from "./pages/OrderPage";
import { SuccesPage } from "./pages/SuccesPage";

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/success" element={<SuccesPage />} />
      </Routes>
    </BrowserRouter>
  );
};
