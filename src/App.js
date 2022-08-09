import './App.css';
import PanoContextContainer from './contexts/PanoContextContainer';
import Home from './pages/home'; 

function App() {
  return (

    <PanoContextContainer>
      <Home />
    </PanoContextContainer>
    
  );
}

export default App;
