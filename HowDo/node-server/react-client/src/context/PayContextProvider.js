import { createContext, useContext, useState } from "react";
import { dataPayReady } from "../data/Pay";
import { useUserContext } from "./UserContextProvider";

const PayContext = createContext();

export const usePayContext = () => {
  return useContext(PayContext);
};

export const PayContextProvider = ({ children }) => {
  const { userSession } = useUserContext();
  const [statePayReady, setPayReady] = useState(dataPayReady);
  // const [statePayApprove, setPayApprove] = useState(dataPayApprove);

  const payReadyBody = (orderUser, price) => {
    setPayReady({
      ...statePayReady,
      partner_user_id: userSession.username,
      partner_order_id: orderUser,
      item_name: orderUser,
      total_amount: price,
    });
    localStorage.setItem("order_id", orderUser);
  };

  const props = {
    statePayReady,
    setPayReady,
    payReadyBody,
    // statePayApprove,
    // setPayApprove,
    userSession,
  };
  return <PayContext.Provider value={props}>{children}</PayContext.Provider>;
};
