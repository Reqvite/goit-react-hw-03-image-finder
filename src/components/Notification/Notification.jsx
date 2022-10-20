import { NotificationStyled } from "./Notifications.styled"

export const Notification = ({error}) => {

    return (
        <>
            <NotificationStyled>{error}</NotificationStyled>
        </>
    )
}