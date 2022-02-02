import React from 'react'
import {Popover} from '@material-ui/core'

export const PopoverUI = ({anchorEl, component, onClose, left}) => {
    return (
        <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: left ? 'left' : 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            onClose={onClose}
        >
            {component}
        </Popover>
    )
}