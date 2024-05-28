import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import Home from './components/Home';
import FOUROFOUR from './FOUROFOUR';
import RegisterAdmin from './components/Auth/registerAdmin';
import CreateTicket from './components/subComponent/createTIcket';
import AnsweredTicket from './components/subComponent/answeredTicket';
import UnansweredTicket from './components/subComponent/UnansweredTicket';
import MyTicket from './components/subComponent/MyTicket';

const Routs = () =>{
    return (<div>
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register/admin' element={<RegisterAdmin/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/createTicket' element={<CreateTicket/>}/>
                <Route path='/answeredTicket' element={<AnsweredTicket/>}/>
                <Route path='/unansweredTicket' element={<UnansweredTicket/>}/>
                <Route path='/myticket' element={<MyTicket/>}/>
                <Route path ='/'element={<Home/>}/>
                <Route path ='/home'element={<Home/>}/>
                <Route path ='*'element={<FOUROFOUR/>}/>
            </Routes>
        </Router>
    </div>)
}
export default Routs