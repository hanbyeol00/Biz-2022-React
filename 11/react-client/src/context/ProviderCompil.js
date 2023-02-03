import { UserContextProvider } from "./UserContextProvider";
import { TransferContextProvider } from "./TransferContextProvider";
import { VideoContentContextProvider } from "./VideoContentContextProvide";
import { AutoSearchContextProvider } from "./AutoSearchProvider";
import { PayContextProvider } from "./PayContextProvider";
const Provider = ({ children }) => {
  return (
    <UserContextProvider>
      <VideoContentContextProvider>
        <PayContextProvider>
          <AutoSearchContextProvider>
            <TransferContextProvider>{children}</TransferContextProvider>
          </AutoSearchContextProvider>
        </PayContextProvider>
      </VideoContentContextProvider>
    </UserContextProvider>
  );
};

export default Provider;
