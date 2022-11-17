import { Container} from "./style";

//Libs Imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//Provider imports
import { useRegister } from "../../Providers/Register";

//Router-dom imports
import { useHistory } from "react-router-dom";

//Reacts imports
import { useState } from "react";

const Register = ({ authenticated }) => {
  const history = useHistory();

  if (authenticated) {
    history.push("/home");
  }

  const [showOrHidePass, setShowOrHidePass] = useState({
    password: false,
    confirmPassword: false,
  });

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username requeired")
      .min(3, "Min 3 letters required")
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Apenas letras e espaços"
      ),
    password: yup
      .string()
      .required("Senha obrigatoria")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "E necessario  ter pelo menos 8 caracteres,1 letra maiuscula e uma minuscula,um caractere especial e um numero"
      ),
    confirmPassword: yup
      .string()
      .required("Confirmação de senha obrigatoria")
      .oneOf([yup.ref("password"), null], "As senhas devem ser identicas"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const { postUser } = useRegister();
  const onSubmitFunction = ({ username, password }) => {
    const user = { username, password };
    postUser(user);
    history.push("/login");
  };

  const handleShowPassword = (type) => {
    if (type === "pass") {
      if (showOrHidePass.password) {
        setShowOrHidePass((passValor) => {
          return { ...passValor, password: false };
        });
      } else {
        setShowOrHidePass((passValor) => {
          return { ...passValor, password: true };
        });
      }
    }

    if (type === "confirmPass") {
      if (showOrHidePass.confirmPassword) {
        setShowOrHidePass((passValor) => {
          return { ...passValor, confirmPassword: false };
        });
      } else {
        setShowOrHidePass((passValor) => {
          return { ...passValor, confirmPassword: true };
        });
      }
    }
  };

  const handleNavegation = () => {
    history.push("/login");
  };

  return (
    <Container>
       <div>
       <div>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <input
              name="username"
              label="Username"
              placeholder="Digite seu username"
              register={register}
              error={errors.username?.message}
            />

            <input
              name="password"
              label="Senha"
              type={showOrHidePass.password ? "text" : "password"}
              placeholder="Digite sua senha"
              register={register}
              error={errors.password?.message}
              handleShowPassword={() => handleShowPassword("pass")}
              
            />

            <input
              name="confirmPassword"
              type={showOrHidePass.confirmPassword ? "text" : "password"}
              label="Confirmar senha"
              placeholder="Digite sua senha"
              register={register}
              error={errors.confirmPassword?.message}
              handleShowPassword={() => handleShowPassword("confirmPass")}
             
            />

            <button
              type="submit"
              backGround="teal"
              textColor="white"
              backGroundHover="red"
            >
              Cadastrar
            </button>
            <div className="boxLogin">
              <p>
                Ja tem uma conta?{" "}
                <span onClick={() => handleNavegation("/login")}>
                  fazer Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};
export default Register;
