//Hooks imports
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
//Service imports
import { Api } from "../../services/Api";

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [registerUser, setRegister] = useState([]);

  const postUser = (user) => {
    Api.post("/user/register", user)
      .then((response) => {
        setRegister(response.data);

        toast.success("Registro realizado com sucesso!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
      })
      .catch((err) => {
        console.error(err)
        toast.error("Registro não realizado!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
      });
  };

  return (
    <RegisterContext.Provider value={{ postUser, registerUser }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext);
