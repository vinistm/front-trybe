//Page imports
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Home from "../Pages/Home";

//Router-dom imports
import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLogin } from "../Providers/Login";

const Routes = () => {
  const { getUserLogged } = useLogin();
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("@Trybe:token")
  );

  useEffect(() => {
    const token = localStorage.getItem("@Trybe:token");
    const id = localStorage.getItem("@Trybe:userId");

    if (id) {
      getUserLogged(id, token);
    }
  }, [authenticated]);

  return (
    <Switch>
       <Route exact path="/home">
        <Home authenticated={authenticated} />
      </Route>
      <Route exact path="/login">
        <Login
          setAuthenticated={setAuthenticated}
          authenticated={authenticated}
        />
      </Route>
      <Route exact path="/user/register">
        <Register type="user"/>
      </Route>
     
    </Switch>
  );
};

export default Routes;
