import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { login } from '../api/Api.js'
import PropTypes from "prop-types";

const styles = theme => ({

})

class CreateAccount extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
    }
    state = { text: 'Please enter your username and password', username: '', password: '', error: false }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleClick = async () => {
        let response = await login(this.state.username, this.state.password)
        if (response.status === 200) {
            const normal_text = 'Please enter your username and password'
            const token = await response.text()
            localStorage.setItem('forum-token', token)
            this.setState({ username: '', password: '', error: false, text: normal_text })
            this.context.router.history.push("/user/" + this.state.username);
            this.props.onClose()
        } else if (response.status === 401) {
            const error_text = 'Sorry, your password or username was wrong. Please try again'
            this.setState({ password: '', error: true, text: error_text })
        } else {
            const error_text = 'Sorry, an unknown error occured. If this persists, please notify site admins'
            this.setState({ password: '', username: '', text: error_text })
        }
    }

    render() {
        const { classes, open, onClose } = this.props
        const { username, password, error, text } = this.state
        return (
            <Dialog open={open} onClose={() => onClose()}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                    <TextField
                        error={error}
                        style={{ width: '60%' }}
                        id="outlined-name"
                        label='Username'
                        type='text'
                        value={username}
                        className={classes.textField}
                        onChange={this.handleChange('username')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        error={error}
                        style={{ width: '60%' }}
                        id="outlined-password"
                        label='Password'
                        type="password"
                        value={password}
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