import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { openNotification } from '../components/items/notification';
import { TokenDeviceSave } from '../models/request/TokenDevice';
import { FailResponseModel } from '../models/ResponseModel';
import { saveTokenUserService } from '../services/UserService';
import { notifyErr } from '../utils/notify';

const firebaseConfig = {
    apiKey: "AIzaSyAq72Ws3FmOuDqc7GX82TkFcRDxfcB93NQ",
    authDomain: "upskilling-51b2e.firebaseapp.com",
    projectId: "upskilling-51b2e",
    storageBucket: "upskilling-51b2e.appspot.com",
    messagingSenderId: "543899053740",
    appId: "1:543899053740:web:0cbad844b21fb25536b909",
    measurementId: "G-NEJJ3MN5QK"
};
const vapidKey: string = "BIUugrcx45GBf6l5GBBRrjBGYRt9a9-Hxkeg4G4sQmh-NkQqnPfDXw9uZDTJmEPlpMXJ4ZSvzpGqrmRA6Q4yl08";
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);


export const requestNotificationPermission = async (): Promise<boolean> => {
    const permission = await Notification.requestPermission();
    if (permission == "granted") {
        return true;
    } else if (permission === "denied") {
        notifyErr("Bạn đã chặn thông báo của trang web, vui lòng bỏ chặn nếu tiếp tục muốn nhận thông báo");
    } else {
        await Notification.requestPermission();
        requestNotificationPermission();
    }
    return false;
}

export const listenToMessages = (onClickButtonNotify: ((id: number) => void)) => {
    onMessage(messaging, (payload) => {
        const data = payload.data as { peerReviewId: string} | undefined;
        openNotification(onClickButtonNotify, "bottomRight", Number(data?.peerReviewId), payload.notification?.title + "", payload.notification?.body+"");
        console.log('Message received. ', payload);
    });
}
export const fetchFCMToken = async (): Promise<string> => {
    try {
        const registration = await navigator.serviceWorker.ready;
        const currentToken = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration });
        if (currentToken) {
            saveToken(currentToken);
            return currentToken;
        } else {
            console.log('No registration token available.');
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
    }
    return "";
};
const saveToken = async (token: string) => {
    const dataRequest: TokenDeviceSave = { token: token }
    try {
        const res = await saveTokenUserService(dataRequest);
        const { status, data } = res;
        if (status == 200) {
            const success = data as String;
            console.log(`save token: ${token} ${success}`);
        }
        else {
            const fail = data as FailResponseModel;
            notifyErr(fail.errorMessage);
        }
    }
    catch (error) {

    }
}
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then(registration => {
                console.log('Service Worker registered: ', registration);
            })
            .catch(registrationError => {
                console.log('Service Worker registration failed: ', registrationError);
            });
    }
}


export const checkPushSubscription = async (registration: ServiceWorkerRegistration): Promise<PushSubscription | null> => {
    try {
        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: vapidKey
            });
        }
        return subscription;
    } catch (error) {
        console.error('Failed to create push subscription', error);
        throw error;
    }
};