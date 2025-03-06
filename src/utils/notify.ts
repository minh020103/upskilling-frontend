import { toast } from "react-toastify"

// Configuration for the failure notification
export const notifyErr = (mes: string) => {
    toast.error(mes, {
        position: "top-right",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
}
// Configuration for the success notification
export const notifySuccess = (mes: string) => {
    toast.success(mes, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
}