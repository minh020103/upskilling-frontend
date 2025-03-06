import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface DataPrivateUser {
    element: JSX.Element;
}
export const PrivateUser = (props: DataPrivateUser) => {
    const { element } = props;
    const tokenJwt = Cookies.get('tokenJwt');
    const navigate = useNavigate();
    const [checkLogin, setCheckLogin] = useState(false);
    useEffect(() => {
        if(!tokenJwt){
            navigate("/login");
        } else {
            setCheckLogin(true);
        }
    },[tokenJwt])
    return checkLogin ? element: <></>;
}