import {Store} from "react-notifications-component";

export const onError = () => {
    Store.addNotification({
        title: "Ошибка",
        type: "danger",
        message: "Что-то пошло не так :(",
        container: "top-right"
    })
}