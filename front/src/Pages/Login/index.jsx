
//Libs Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";


//Provider imports
import { useLogin } from "../../Providers/Login";

//Router-dom imports
import { useHistory } from "react-router-dom";

//Reacts imports
import { useState } from "react";

const Login = ({ setAuthenticated, authenticated }) => {
  const history = useHistory();

  // if (authenticated) {
  //   history.push("/home");
  // }

  const [showOrHidePass, setShowOrHidePass] = useState(false);

  const handleNavegation = () => {
    history.push("/register");
  };

  const formSchema = yup.object().shape({
    username: yup.string().required("username obrigatorio"),
    password: yup
      .string()
      .required("Senha obrigatoria")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "E necessario  ter pelo menos 8 caracteres,1 letra maiuscula e uma minuscula,um caractere especial e um numero"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { getUser } = useLogin();

  const onSubmitFunction = ({ username, password }) => {
    const user = { username, password };

    getUser(user, setAuthenticated);
  };
  const handleShowPassword = () => {
    if (showOrHidePass) {
      setShowOrHidePass(false);
    } else {
      setShowOrHidePass(true);
    }
  };
  return (
    <>
      <div>
       <div>
         
          <form>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <input
                name="username"
                label="username"
                placeholder="Digite seu username"
                register={register}
                error={errors.username?.message}
              />

              <input
                name="password"
                label="Senha"
                type={showOrHidePass ? "text" : "password"}
                placeholder="Digite sua senha"
                register={register}
                error={errors.password?.message}
                handleShowPassword={handleShowPassword}
                
              />

              <button backGround="#47777b" textColor="#f3f3f3" type="submit">
                Login
              </button>
            </form>
            <div className="boxCadastro">
              <p>
                Não tem uma conta?{" "}
                <span onClick={handleNavegation}>fazer cadastro</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
