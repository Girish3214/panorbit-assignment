import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GET_USERS } from "../APIs";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    msg: "",
  });

  const sidebarElements = useMemo(
    () => [
      {
        title: "Profile",
        link: "/profile",
      },
      {
        title: "Posts",
        link: "/posts",
      },
      {
        title: "Gallery",
        link: "/gallery",
      },
      {
        title: "ToDo",
        link: "/toDo",
      },
    ],
    []
  );

  const setSelectedUserDetails = useCallback((user) => {
    setSelectedUser(user);
    if (Object.keys(user).length === 0) {
      sessionStorage.clear();
      return;
    }
    sessionStorage.setItem("user", JSON.stringify(user));
  }, []);

  const getUsers = async () => {
    setLoading(true);
    if (usersData.length === 0) {
      try {
        const response = await axios.get(GET_USERS);
        if (response.status === 200) {
          const { data } = response;

          setUsersData(data?.users ?? []);
          setLoading(false);
        }
      } catch (error) {
        setError({
          error: true,
          msg: "Something went wrong. Please try again later!",
        });
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getUsers();

    if (
      Object.keys(selectedUser).length === 0 &&
      sessionStorage.getItem("user")
    ) {
      console.log("called...");
      const user = JSON.parse(sessionStorage.getItem("user"));
      setSelectedUserDetails(user);
    }

    return () => {};
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        error,
        usersData,
        selectedUser,
        sidebarElements,
        setSelectedUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider, useGlobalContext };
