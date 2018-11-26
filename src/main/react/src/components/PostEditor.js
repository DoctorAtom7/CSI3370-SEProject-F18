import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { create_post, submit_edited_post } from '../api/Api.js'
import { create } from 'jss';

const styles = {
    editorRoot: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    textField: {
        margin: '15px'
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        marginLeft: '10px',
        marginRight: '25px'
    }
};

class PostEditor extends Component {
    state = { title: '', text: '' }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }
    handleClick = async () => {
        if (this.props.type === 'create') {
            const b = await create_post(this.state.title, this.state.text)
            console.log(b)
        } else if (this.props.type === 'edit') {
            const b = await submit_edited_post(this.state.title, this.state.text, this.props.postId)
            console.log(b)
        }
    }

    render() {
        const { classes, close } = this.props;
        return (
            <div className={classes.editorRoot}>
                <TextField
                    id="title-textfield"
                    label="Title"
                    className={classes.textField}
                    value={this.state.title}
                    onChange={this.handleChange('title')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="description"
                    label="Text Body"
                    multiline
                    rows="14"
                    value={this.state.text}
                    onChange={this.handleChange('text')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <div className={classes.buttonDiv}>
                    <Button variant="outlined" className={classes.button}>
                        Upload Media
                    </Button>
                    <Button variant="contained" className={classes.button} color='primary' onClick={this.handleClick}>
                        Post
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PostEditor);