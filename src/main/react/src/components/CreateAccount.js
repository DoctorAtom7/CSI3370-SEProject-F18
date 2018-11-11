import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { create_account } from '../api/Api'

const styles = theme => ({

})

class CreateAccount extends Component {
    state = { stage: 1, text: '', email: '', username: '', password: '', text_two: '' }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleClick = (stage) => {
        const { text, text_two } = this.state

        if (stage === 1) {

            if (this.validateEmail(this.state.text)) {
                this.setState({ email: text, text: '', stage: stage + 1 })
            } else {
                alert("Invalid email")
            }

        } else if (stage === 2) {
            let username_taken = false

            if (!username_taken) {
                this.setState({ username: text, text: '', stage: stage + 1 })
            } else {
                alert("Username taken")
            }

        } else if (stage === 3) {
            if (text === text_two) {
                if (text.length >= 7) {
                    if (create_account(this.state.username, this.state.email, text) === 201) {
                        this.props.showSnack("Account Created!")
                        this.setState({ stage: 1, text: '', email: '', username: '', password: '', text_two: '' })
                        this.props.onClose()
                    } else {
                        alert("Account Creation Error!")
                    }
                } else {
                    alert("Password too short")
                }
            } else {
                alert("Passwords don't match")
            }
        }
    }

    render() {
        const { classes, open, onClose } = this.props;

        const { stage } = this.state

        let title, message, button, label, type = null

        switch (stage) {
            case 1:
                title = "Let the world hear your voice"
                message = "By having a Placeholder account, you can vote and comment on " +
                    "all your favorite threads. Sign up in just seconds."
                button = "Next"
                label = "Email"
                type = "email"
                break;
            case 2:
                title = "Choose your username"
                message = " Your username is how other community members will see you." +
                    "This name will be used to credit you for things you share on Reddit. What should we call you?"
                button = "Next"
                label = "Username"
                type = "text"
                break;
            case 3:
                title = "Almost done!"
                message = "To ensure your security, please choose a password at least 7 characters in length. " +
                    "Never reveal your password to anyone - even if they ask very nicely."
                label = "Password"
                button = "Create Account"
                type = "password"

        }

        return (
            <Dialog open={open} onClose={() => onClose()}>
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                    <TextField
                        style={{ width: '60%' }}
                        id="outlined-name"
                        label={label}
                        type={type}
                        value={this.state.text}
                        className={classes.textField}
                        onChange={this.handleChange('text')}
                        margin="normal"
                        variant="outlined"
                    />
                    {stage === 3 &&
                        <TextField
                            style={{ width: '60%' }}
                            id="outlined-password"
                            label="Verify Password"
                            type="password"
                            value={this.state.text_two}
                            className={classes.textField}
                            onChange={this.handleChange('text_two')}
                            margin="normal"
                            variant="outlined"
                        />
                    }
                </DialogContent>
                <DialogActions>
                    {stage !== 1 &&
                        <Button onClick={() => this.handleClick(stage)}
                            onClick={() => this.setState({ stage: stage - 1 })}>Back</Button>
                    }
                    <Button onClick={() => this.handleClick(stage)}>{button}</Button>
                </DialogActions>
            </Dialog >
        )
    }

}


export default withStyles(styles)(CreateAccount)