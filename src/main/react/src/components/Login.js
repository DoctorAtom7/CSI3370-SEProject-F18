import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

})

class CreateAccount extends Component {
    state = { username: '', password: '' }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleClick = (stage) => {

    }

    render() {
        const { classes, open, onClose } = this.props
        const { username, password } = this.state
        return (
            <Dialog open={open} onClose={() => onClose()}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your username and password
                    </DialogContentText>
                    <TextField
                        style={{ width: '60%' }}
                        id="outlined-name"
                        label='Username'
                        type='text'
                        value={this.state.username}
                        className={classes.textField}
                        onChange={this.handleChange('username')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        style={{ width: '60%' }}
                        id="outlined-password"
                        label='Password'
                        type="password"
                        value={this.state.password}
                        className={classes.textField}
                        onChange={this.handleChange('password')}
                        margin="normal"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClick()}>Login</Button>
                </DialogActions>
            </Dialog >
        )
    }

}


export default withStyles(styles)(CreateAccount)