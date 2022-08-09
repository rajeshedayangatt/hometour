import React, { useEffect, useState } from 'react';

const PanoContext = React.createContext({ })
export { PanoContext };

const PanoContextContainer = (props) => {
  const [ selected, setSelected ] = useState(0);
  const [enableScroll,setEnableScroll] = useState(false)
  const [ showLoader, setShowLoader ] = useState(true);
  const [ showTutorial, setShowTutorial ] = useState(false);
  const [ showIntrudction, setShowIntrudction ] = useState(false);
  useEffect(()=>{
  })

  return (
    <PanoContext.Provider
      value={{
        showLoader,
        setShowLoader,
        showTutorial,
        setShowTutorial,
        showIntrudction, 
        setShowIntrudction,
        selected,
        setSelected,
        enableScroll,
        setEnableScroll,
      }}
    >
      { props.children }
    </PanoContext.Provider>
  )
}

export default PanoContextContainer;
