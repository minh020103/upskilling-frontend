import { useEffect, useState } from "react";
import { Avatar, Badge, Button, List, Tabs, Typography } from "antd";
import styled from "styled-components";
import {
  getAllDataPeerReviewServiceByUserId,
  markNotification,
} from "../../../services/ChallengeService";
import { PageImpl } from "../../../models/PaginationModel";
import { ContentPeerReviewInfo } from "../../../models/review";
import { FailResponseModel } from "../../../models/ResponseModel";
import { notifyErr } from "../../../utils/notify";
import "moment/locale/vi";
import moment from "moment";
import { useNavigate } from "react-router-dom";

moment.locale("vi");

const { TabPane } = Tabs;
const { Text } = Typography;
interface ContentPeerReview {
  countPeer: () => void;
}
const itemNumberInPage = 3;
export const NotificationComponent = (props: ContentPeerReview) => {
  const navigate = useNavigate();
  const { countPeer } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [unreadNotifications, setUnreadNotifications] = useState<
    ContentPeerReviewInfo[]
  >([]);
  const [allNotifications, setAllNotifications] = useState<
    ContentPeerReviewInfo[]
  >([]);

  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    getData(currentPage, true);
  }, []);

  const getData = async (page: number, initialLoad: boolean = false) => {
    initialLoad ? setInitLoading(true) : setLoading(true);
    try {
      const response = await getAllDataPeerReviewServiceByUserId(
        page - 1,
        itemNumberInPage
      );
      const { status, data } = response;
      if (status == 200) {
        const success = data as PageImpl<ContentPeerReviewInfo>;

        setTotalPages(success.totalPages);
        if (initialLoad) {
          setAllNotifications(success.content);
          setUnreadNotifications(
            success.content.filter(
              (notification) => notification.status === "unread"
            )
          );
        } else {
          const newNotifications = success.content;
          setAllNotifications((prev) => [...prev, ...newNotifications]);
          setUnreadNotifications((prev) => [
            ...prev,
            ...newNotifications.filter(
              (notification) => notification.status === "unread"
            ),
          ]);
        }
      } else {
        const fail = data as FailResponseModel;
        alert(fail.errorMessage);
      }
    } catch (error) {
      alert(error);
    }
    initialLoad ? setInitLoading(false) : setLoading(false);
  };
  const onLoadMore = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        getData(nextPage);
        return nextPage;
      });
    } else {
      notifyErr("This is the last page");
    }
  };

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      const res = await markNotification(notificationId);
      if (res.status === 204 || res.status === 200) {
        setAllNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, status: "read" }
              : notification
          )
        );

        setUnreadNotifications((prevUnread) =>
          prevUnread.filter(
            (notification) => notification.id !== notificationId
          )
        );

        countPeer();
      } else {
        console.error("Unexpected status code:", res.status);
        alert("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      alert("Failed to mark notification as read due to an error");
    }
    navigate(`/user/dashboard/available-challenges/${notificationId}/review`);
  };

  const loadMore =
    !initLoading && !loading && currentPage < totalPages ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const NotificationList = ({
    notifications,
  }: {
    notifications: ContentPeerReviewInfo[];
  }) => (
    <List
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item
          style={{
            background: item.status === "unread" ? "#f5f5f5" : "transparent",
            padding: "12px",
          }}
          onClick={() => handleMarkAsRead(item.id)}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={<Text strong>{item.user.fullName}</Text>}
            description={
              <div>
                <Text>{item.userChallengeStart.challenge.title}</Text>
                <br />
                <Text type="secondary">
                  {moment(item.createdAt, "YYYY-MM-DD HH:mm:ss").fromNow()}
                </Text>
              </div>
            }
          />
          {item.status === "unread" && <Badge dot color="blue" />}
        </List.Item>
      )}
    />
  );
  const items = [
    {
      label: 'All',
      key: '1',
      children: <NotificationList notifications={allNotifications} />,
    },
    {
      label: 'UnRead',
      key: '2',
      children: <NotificationList notifications={unreadNotifications} />,
    },
  ];
  return (
    <NotificationWrapper>
      <Tabs defaultActiveKey={"1"} items={items} onChange={(key) => setActiveTab(key)}/>
    </NotificationWrapper>
  );
};

const NotificationWrapper = styled.div`
  min-width: 400px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  
  .ant-tabs-nav {
    margin-bottom: 8px;
  }

  .ant-tabs-tab-btn {
    font-weight: bold;
  }

  .ant-list-item-meta-title {
    margin-bottom: 4px;
  }

  .ant-list-item {
    border-bottom: 1px solid #f0f0f0;
  }
`;
