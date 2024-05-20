import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import Home from './components/Home';
import FOUROFOUR from './FOUROFOUR';

const Routs = () =>{
    return (<div>
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path ='/'element={<Home/>}/>
                <Route path ='/home'element={<Home/>}/>
                <Route path ='*'element={<FOUROFOUR/>}/>
            </Routes>
        </Router>
    </div>)
}
export default Routs