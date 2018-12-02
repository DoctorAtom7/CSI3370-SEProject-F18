import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


class EditMember extends Component {

    check_submit = () => {
        if (this.props.new_check !== this.props.new_password) {
            alert('Passwords do not match')
        } else {
            this.props.handleSubmit()
        }
    }

    render() {
        const { open, onClose, username, email, bio, handleChange, new_password, new_check } = this.props;

        return (
            <Dialog open={open} onClose={() => onClose()}>
                <DialogTitle id="form-dialog-title">Edit your personal information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Feel free to change any text field - remember to submit if you want your changes saved
                    </DialogContentText>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            style={{ width: '60%' }}
                            label='Email'
                            type='text'
                            value={email}
                            onChange={handleChange('email')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            style={{ width: '60%' }}
                            label='Password'
                            type='password'
                            value={new_password}
                            onChange={handleChange('new_password')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            style={{ width: '60%' }}
                            label='Confirm Password'
                            type='password'
                            value={new_check}
                            onChange={handleChange('new_check')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="description"
                            label="Bio"
                            multiline
                            rows="14"
                            value={bio}
                            onChange={handleChange('bio')}
                            margin="normal"
                            variant="outlined"
                        />

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.check_submit}>Submit</Button>
                </DialogActions>
            </Dialog >
        )
    }

}


export default EditMember