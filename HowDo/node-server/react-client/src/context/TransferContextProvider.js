import { createContext, useContext, useState } from "react";

const TransferContext = createContext();

export const useTransferContext = () => {
  return useContext(TransferContext);
};

export const TransferContextProvider = ({ children }) => {
  const [bbsButton, setBbsButton] = useState(true);
  const [contentButton, setContentButton] = useState(false);

  const props = { bbsButton, setBbsButton, contentButton, setContentButton };
  return (
    <TransferContext.Provider value={props}>
      {children}
    </TransferContext.Provider>
  );
};
