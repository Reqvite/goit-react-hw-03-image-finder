import { LoadMoreButton } from "./Button.styled"

export const Button = (({ loadMore }) => {   
    return (
        <LoadMoreButton onClick={loadMore}>Load more</LoadMoreButton>
    )
})