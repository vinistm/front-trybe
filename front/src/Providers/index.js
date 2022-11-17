
import { LoginProvider } from "./Login";
import { RegisterProvider } from "./Register";
import { HomeProvider } from "./Home";


const Providers = ({ children }) => {
  return (
    <RegisterProvider>
      <LoginProvider>
        <HomeProvider>{children}</HomeProvider>
      </LoginProvider>
    </RegisterProvider>
  );
};

export default Providers;
