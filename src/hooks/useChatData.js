let chat = [
  {
    id: 1,
    message: "HI",
    sender: "",
  },
  {
    id: 2,
    message: "Hello",
    sender: "",
  },
  {
    id: 3,
    message: "How are you",
    sender: "",
  },
  {
    id: 4,
    message: "Good! What about you",
    sender: "",
  },
  {
    id: 5,
    message: "Fine",
    sender: "",
  },
  {
    id: 6,
    message: "Ok!",
    sender: "",
  },
];

const chatData = () => {
  const addToChat = (message, sender) => {
    chat.push({
      id: chat.length + 1,
      message,
      sender: sender,
    });
  };
  return { chat, addToChat };
};

export default chatData;
