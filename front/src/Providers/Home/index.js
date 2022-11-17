//Hooks imports
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
//Service imports
import { Api } from "../../services/Api";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    Api.get("/dashboard")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => console.log(err));
  };

  const createNewPost = (data, token) => {
    Api.post("/dashboard", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then(() => {
        getPosts();
        toast.success("Post Realizado!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
      })
      .catch((err) => {
        console.log(err)
        toast.error("Post não realizado!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
      });
  };

  return (
    <HomeContext.Provider value={{ posts, getPosts, createNewPost }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => useContext(HomeContext);
