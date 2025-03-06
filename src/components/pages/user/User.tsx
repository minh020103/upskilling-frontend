import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPushSubscription, fetchFCMToken, listenToMessages, requestNotificationPermission } from '../../../firebase/firebase-config';
import HomeNavAndSide from '../../views/HomeNavAndSide';

export default function User() {
    const navigate = useNavigate();
    const onClickButtonNotify = (id: number) => {
        navigate(`/user/dashboard/available-challenges/${id}/review`);
    }
    useEffect(() => {
        const setupNotifications = async () => {
            const permissionGranted = await requestNotificationPermission();
            if (permissionGranted) {
                const registration = await navigator.serviceWorker.ready;
                try {
                    const subscription = await checkPushSubscription(registration);
                    if (subscription) {
                        const token = await fetchFCMToken();
                        if (token) {
                            listenToMessages(onClickButtonNotify);
                        }
                    }
                } catch (error) {
                    console.error('Error during notification setup', error);
                }
            }
        };
        setupNotifications();
    }, [])
    return (
        <>
            <HomeNavAndSide />
        </>
    )
}