import { createContext, useState } from 'react';

const AppContext = createContext({
  centerContainer: '',
  activeButtonLeft: 7,
  changeCenterContainer: () => {},
  toggleActiveButtonLeft: () => {},
});

export const AppContextProvider = (props) => {
  const [centerContainer, setCenterContainer] = useState('centerdashboard');
  const [activeButtonLeft, setactiveButtonLeft] = useState(7);
  const changeCenterContainer = (value) => {
    setCenterContainer(value);
  };

  const toggleActiveButtonLeft = (value) => {
    setactiveButtonLeft(value);
  };
  const context = {
    // state
    centerContainer: centerContainer,
    changeCenterContainer: changeCenterContainer,
    activeButtonLeft: activeButtonLeft,
    toggleActiveButtonLeft: toggleActiveButtonLeft,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
