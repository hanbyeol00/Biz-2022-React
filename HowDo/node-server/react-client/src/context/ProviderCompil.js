import { UserContextProvider } from "./UserContextProvider";
import { TransferContextProvider } from "./TransferContextProvider";
import { VideoContentContextProvider } from "./VideoContentContextProvide";
import { AutoSearchContextProvider } from "./AutoSearchProvider";
import { PayContextProvider } from "./PayContextProvider";
import { PostContextProvider } from "./PostContextProvider";
const Provider = ({ children }) => {
  return (
    <UserContextProvider>
      <VideoContentContextProvider>
        <PayContextProvider>
          <AutoSearchContextProvider>
            <TransferContextProvider>
              <PostContextProvider>{children}</PostContextProvider>
            </TransferContextProvider>
          </AutoSearchContextProvider>
        </PayContextProvider>
      </VideoContentContextProvider>
    </UserContextProvider>
  );
};

export default Provider;
