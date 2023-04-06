
import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
import Home from './components/homepage';
import SingUP from './components/singUP';
import SingIn from './components/singIn';

function App() {
  return (
  <BrowserRouter>
  
    <div className="App">
      <Navbar/>
      <br/>
      <br/>
      <Routes>
        <Route path ="/" element={<Home/>}></Route>
        <Route path ="/singUP" element={<SingUP/>}></Route>
        <Route path ="/singIn" element={<SingIn/>}></Route>
        <Route path ="/profile" element={<profile/>}></Route>

        
      </Routes>
      <ToastContainer theme="dark"/>
    </div>
    </BrowserRouter>
  );
}

export default App;
