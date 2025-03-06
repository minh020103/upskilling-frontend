import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DataPrivateLogin{
    element: JSX.Element;
}

export const PrivateLogin = (props: DataPrivateLogin) => {
    const { element } = props;
    const tokenJwt = Cookies.get('tokenJwt');
    const navigate = useNavigate();
    const [checkLogin, setCheckLogin] = useState(false)
    useEffect(() => {
        if(tokenJwt){
            navigate("/user");
        } else {
            setCheckLogin(true);
        }
    },[tokenJwt])
    return checkLogin ? element: <></>;
}