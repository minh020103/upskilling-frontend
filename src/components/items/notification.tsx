import { Button, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";


export const openNotification = (onClickButtonNotify: (id: number)=>void, placement: NotificationPlacement, id: number, title: string, description: string) => {
    
    const btn = (
        <Button
            type="primary"
            size="small"
            style={{ borderRadius: '0', width: '72px', height: '32px' }}
            onClick={() => {
                notification.destroy();
                onClickButtonNotify(id?id:0);
            }}
        >
            Review
        </Button>
    );

    notification.open({
        message: `${title}`,
        description: `${description}`,
        placement,
        icon: null,
        btn
    });
};
