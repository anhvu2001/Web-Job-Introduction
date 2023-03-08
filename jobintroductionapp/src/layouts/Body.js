import { createContext, useReducer } from 'react';
import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import CreateWork from '../pages/CreateWork';
import EmployerDetail from '../pages/EmployerDetail';
import EmployerList from '../pages/EmployerList';
import Home from "../pages/Home";
import InFor from '../pages/InFo';
import Introduce from '../pages/introduce';
import Login from '../pages/Login';
import Register from '../pages/Register';
import WorkDetail from '../pages/WorkDetail';
import myReducer from '../reducers/UserReducer';
import Footer from "./Footer";
import Header from "./Header";

export const UserContext = createContext()

export default function Body(){
  const [user, dispatch] = useReducer(myReducer)
  // let path= user.username
  // console.info(user.username)
    return(
      <BrowserRouter>

      <UserContext.Provider value={[user, dispatch]}>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/work/:workId" element={<WorkDetail/>} />
          <Route path="/gioi-thieu" element={<Introduce/>} />
          <Route path="/employer" element={<EmployerList/>} />
          <Route path="/employer/:employerId" element={<EmployerDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/info" element={<InFor/>} />
          <Route path="/creatework" element={<CreateWork />} />
        </Routes>
        <Footer/>
        </UserContext.Provider>
      </BrowserRouter>

    )
    
}