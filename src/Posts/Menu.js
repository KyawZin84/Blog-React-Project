import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import Detail from "./Detail";
import Login from "./Login";
import Userdetail from "./Userdetail";

function Menu(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="" element={<Home/>}/>
            <Route path="form" element={<Form/>}/>
            <Route path="detail" element={<Detail/>}/>
            <Route path="user" element={<Userdetail/>}/>
        </Routes>
    </BrowserRouter>
    )
} 

export default Menu;