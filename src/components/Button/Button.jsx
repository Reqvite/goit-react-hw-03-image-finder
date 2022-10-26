import PropTypes from 'prop-types';

import { LoadMoreButton } from "./Button.styled"

export const Button = (({ loadMore }) => {   
    return (
        <LoadMoreButton onClick={loadMore}>Load more</LoadMoreButton>
    )
})

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
}

