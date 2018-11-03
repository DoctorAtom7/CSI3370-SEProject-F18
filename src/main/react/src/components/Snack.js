import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button'

const Snack = (open, message, buttonText, handleClose) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
            action={[
                <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                    {buttonText}
                </Button>,
            ]}
        />
    )
}
export default Snack