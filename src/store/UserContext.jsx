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
    console.log(user);
    setSelectedUser(user);
  }, []);

  const getUsers = async () => {
    setLoading(true);
    if (usersData.length === 0) {
      try {
        console.log("called..");
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
