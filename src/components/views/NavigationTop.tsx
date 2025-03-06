import * as React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Menu,
  Button,
  Badge,
  Avatar,
  Typography,
  MenuProps,
  Dropdown,
} from "antd";
import styled from "styled-components";
import { UserInformationModel } from "../../models/UserModel";
import {
  deleteTokenDeviceService,
  getUserByToken,
} from "../../services/UserService";
import { FailResponseModel } from "../../models/ResponseModel";
import { fetchFCMToken } from "../../firebase/firebase-config";
import { NotificationComponent } from "../items/notification/NotificationComponent";
import { countNotification } from "../../services/ChallengeService";
const initialGetUser: UserInformationModel = {
  id: 0,
  username: "",
  fullName: "",
  dateBirth: "",
  email: "",
  phone: "",
  status: "",
  avatar: "",
  roles: [],
  position: "",
  company: "",
  address: "",
};
const Header = styled.header`
  background: #001529;
  .demo-logo {
    font-family: Roboto;
    font-size: 18px;
    font-weight: 700;
    line-height: 32px;
    text-align: left;
  }
  .icon-button {
    width: 48px;
    height: 48px;
  }
  .icon-button-notify {
    width: 48px;
    height: 48px;
  }
  .demo-logo {
    color: #fff;
  }
  .ant-badge {
    z-index: 1;
    margin-right: 10px;
  }
  .name-user {
    margin-left: 8px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    text-align: left;
    color: #fff;
  }
`;

export default function NavigationTop() {
  const navigate = useNavigate();
  const tokenJwt: string = Cookies.get("tokenJwt") + "";
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<UserInformationModel>(initialGetUser);
  const [totalNotification, setTotalNotification] = React.useState<number>();

  React.useEffect(() => {
    if (tokenJwt && tokenJwt !== "undefined") {
      getInfomationOfUser(tokenJwt);
    }
  }, [tokenJwt]);

  React.useEffect(() => {
    if (user.id !== 0) {
      countNotifi();
    }
  }, [user.id]);
  React.useEffect(() => {}, [totalNotification]);

  // Retrieve the result via API
  const getInfomationOfUser = async (tokenJwt: string) => {
    setLoading(true);
    const response = await getUserByToken(tokenJwt);
    const { status, data } = response;

    if (status === 200) {
      const userInformation = data as UserInformationModel;
      setUser(userInformation);
    } else {
      const fail: FailResponseModel = data as FailResponseModel;
      alert(fail.errorMessage);
    }
    setLoading(false);
  };

  const onClickProfile = () => {
    navigate("profile");
  };
  const onClickLogout = () => {
    deleteTokenDevice();
  };
  const deleteTokenDevice = async () => {
    try {
      const tokenDevice = await fetchFCMToken();
      const res = await deleteTokenDeviceService(tokenDevice);
      Cookies.remove("tokenJwt");
      navigate("login");
    } catch (error) {}
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={onClickProfile}>profile</div>,
    },
    {
      key: "2",
      label: <div onClick={onClickLogout}>logout</div>,
    },
  ];

  const countNotifi = async () => {
    try {
      const response = await countNotification();
      const { status, data } = response;
      if (status == 200) {
        const success = data as number;
        setTotalNotification(success);
      } else {
        const fail = data as FailResponseModel;
        alert(fail.errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  };
  const itemNotifications: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <NotificationComponent
          countPeer={() => {
            countNotifi();
          }}
        />
      ),
    },
  ];
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        height: "48px",
        padding: "0 16px",
      }}
    >
      <div className="demo-logo">Challenge App</div>
      <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
      <Button type="text" shape="circle">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_291_1151)">
            <path
              d="M13.2118 12.3535L9.15396 8.2957C9.78364 7.48164 10.1243 6.48633 10.1243 5.43945C10.1243 4.18633 9.6352 3.01133 8.75083 2.12539C7.86645 1.23945 6.68833 0.751953 5.43677 0.751953C4.1852 0.751953 3.00708 1.24102 2.1227 2.12539C1.23677 3.00977 0.749268 4.18633 0.749268 5.43945C0.749268 6.69102 1.23833 7.86914 2.1227 8.75352C3.00708 9.63945 4.18364 10.127 5.43677 10.127C6.48364 10.127 7.47739 9.78633 8.29146 9.1582L12.3493 13.2145C12.3612 13.2264 12.3753 13.2358 12.3908 13.2422C12.4064 13.2487 12.4231 13.252 12.4399 13.252C12.4567 13.252 12.4734 13.2487 12.4889 13.2422C12.5045 13.2358 12.5186 13.2264 12.5305 13.2145L13.2118 12.5348C13.2237 12.5229 13.2331 12.5087 13.2396 12.4932C13.246 12.4776 13.2493 12.461 13.2493 12.4441C13.2493 12.4273 13.246 12.4106 13.2396 12.3951C13.2331 12.3795 13.2237 12.3654 13.2118 12.3535ZM7.91177 7.91445C7.24927 8.57539 6.37114 8.93945 5.43677 8.93945C4.50239 8.93945 3.62427 8.57539 2.96177 7.91445C2.30083 7.25195 1.93677 6.37383 1.93677 5.43945C1.93677 4.50508 2.30083 3.62539 2.96177 2.96445C3.62427 2.30352 4.50239 1.93945 5.43677 1.93945C6.37114 1.93945 7.25083 2.30195 7.91177 2.96445C8.57271 3.62695 8.93677 4.50508 8.93677 5.43945C8.93677 6.37383 8.57271 7.25352 7.91177 7.91445Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_291_1151">
              <rect
                width="14"
                height="14"
                fill="white"
                transform="translate(-0.000976562)"
              />
            </clipPath>
          </defs>
        </svg>
      </Button>
      <Dropdown
        menu={{ items: itemNotifications }}
        placement="bottom"
        className="notifications"
        trigger={["click"]}
      >
        <Badge size="small" count={totalNotification}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.4276 12.5692H12.999V6.49777C12.999 3.97813 11.1365 1.89598 8.71331 1.54955V0.854911C8.71331 0.460268 8.39367 0.140625 7.99902 0.140625C7.60438 0.140625 7.28474 0.460268 7.28474 0.854911V1.54955C4.86152 1.89598 2.99902 3.97813 2.99902 6.49777V12.5692H2.57045C2.25438 12.5692 1.99902 12.8246 1.99902 13.1406V13.7121C1.99902 13.7906 2.06331 13.8549 2.14188 13.8549H5.99902C5.99902 14.9585 6.89545 15.8549 7.99902 15.8549C9.1026 15.8549 9.99902 14.9585 9.99902 13.8549H13.8562C13.9347 13.8549 13.999 13.7906 13.999 13.7121V13.1406C13.999 12.8246 13.7437 12.5692 13.4276 12.5692ZM7.99902 14.7121C7.52581 14.7121 7.14188 14.3281 7.14188 13.8549H8.85617C8.85617 14.3281 8.47224 14.7121 7.99902 14.7121ZM4.28474 12.5692V6.49777C4.28474 5.50491 4.67045 4.57277 5.37224 3.87098C6.07402 3.1692 7.00617 2.78348 7.99902 2.78348C8.99188 2.78348 9.92402 3.1692 10.6258 3.87098C11.3276 4.57277 11.7133 5.50491 11.7133 6.49777V12.5692H4.28474Z"
              fill="white"
            />
          </svg>
        </Badge>
      </Dropdown>

      <Dropdown
        menu={{ items }}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
        trigger={["click"]}
      >
        <Avatar size={24} src={user.avatar} />
      </Dropdown>

      <Typography className="name-user">{user.fullName}</Typography>
    </Header>
  );
}
