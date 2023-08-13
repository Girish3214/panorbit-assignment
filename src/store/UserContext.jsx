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
import { useLocation } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { pathname } = useLocation();

  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    msg: "",
  });

  const [openChat, setOpenChat] = useState(false);
  const [openUserChat, setOpenUserChat] = useState(false);

  const [selectedChatUser, setSelectedChatUser] = useState({});

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

  // to set the login user details
  const setSelectedUserDetails = useCallback((user) => {
    setSelectedUser(user);
    if (Object.keys(user).length === 0) {
      sessionStorage.clear();
      return;
    }
    sessionStorage.setItem("user", JSON.stringify(user));
  }, []);

  // to open the chats modal
  const setUsersChatOpen = useCallback(() => {
    setOpenChat((prev) => !prev);
  }, []);

  // to open the selected user  chats modal
  const setUserChatOpen = useCallback(() => {
    setOpenUserChat((prev) => !prev);
  }, []);

  // to set the selected user chat and open the modal
  const setSelectedChatUserDetails = useCallback((user) => {
    setOpenUserChat(true);
    setSelectedChatUser(user);
  }, []);

  // to close the chane with user
  const closeChat = useCallback(() => {
    setOpenUserChat(false);
    setSelectedChatUser({});
  }, []);

  // to get the users from the database
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
      const user = JSON.parse(sessionStorage.getItem("user"));
      setSelectedUserDetails(user);
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (openChat) {
      setOpenChat(false);
      setOpenUserChat(false);
      setSelectedChatUser({});
    }

    return () => {};
  }, [pathname]);

  return (
    <UserContext.Provider
      value={{
        loading,
        error,
        usersData,
        selectedUser,
        sidebarElements,
        selectedChatUser,
        openChat,
        openUserChat,
        setOpenUserChat,
        setUserChatOpen,
        closeChat,
        setSelectedUserDetails,
        setSelectedChatUserDetails,
        setUsersChatOpen,
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
