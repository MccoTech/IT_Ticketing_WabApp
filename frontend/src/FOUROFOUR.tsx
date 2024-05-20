import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const FOUROFOUR = () =>{
const navigate = useNavigate()
useEffect(()=>{
        setTimeout(() => {
            navigate('/')
        }, 20000);
    },[])
    return <div style={{backgroundColor:'blue'}}> You are lost. You will be redirected in 20 second</div>
}

export default FOUROFOUR 