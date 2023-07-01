import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./UserAuthContext";

export const ChatContext = createContext();

/**
 * The ChatContextProvider function is a React Context Provider that provides the chatReducer function
 * and the InitialState object to the ChatContext.Provider value prop.
 * @returns The ChatContextProvider is returning the ChatContext.Provider with the value of the state
 * and dispatch.
 */
export function ChatContextProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const InitialState = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, InitialState);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
