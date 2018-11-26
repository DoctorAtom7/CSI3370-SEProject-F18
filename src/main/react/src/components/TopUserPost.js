import React, { Component, Fragment } from 'react';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Post from './Post.js'
import { get_top_posts, submit_edited_post } from '../api/Api'

class TopUserPost extends Component {

    state = { posts: [], error: false, modal: 'none', edit_title: '', edit_body: '', edit_id: null }

    componentDidMount() {
        const { username } = this.props
        get_top_posts(username).then(data => {
            this.setState({ posts: data })
        })
    }

    handle_up_vote = (id) => {
        let postArray = this.state.posts

        for (let i = 0; i < postArray.length; i++) {
            if (postArray[i].postId === id && !postArray[i].voted) {
                postArray[i].postLike += 1
                postArray[i].voted = true
            }
        }

        this.setState({ posts: postArray })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    edit_post = (edit_title, edit_body, edit_id) => {
        this.setState({ edit_title, edit_body, edit_id, modal: 'edit_post' })
    }

    get_list = () => {
        const { posts } = this.state
        if (posts === null || posts === undefined) {
            return <div>Hello</div>
        }
        let items = []
        console.log('posts:', posts)
        posts.forEach(element => {
            items.push(<Post data={element} handle_vote={this.handle_up_vote} edit_post={this.edit_post}
                key={element.postId}></Post>)
        })

        return items
    }

    submit_edit = () => {
        submit_edited_post(this.state.edit_title, this.state.edit_body, this.state.edit_id)
        this.setState({ edit_body: '', edit_id: null, edit_title: '', modal: 'none' })
    }



    render() {

        const { modal, edit_title, edit_body } = this.state
        return (
            <Fragment>
                <List style={{ width: '60%', margin: 15 }}>
                    {this.get_list()}
                </List>
                <Dialog open={modal === 'edit_post'} onClose={() => this.setState({ modal: 'none' })}>
                    <DialogTitle id="form-dialog-title">Edit your previous post:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Feel free to change any text field - remember to submit if you want your changes saved
                    </DialogContentText>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                style={{ width: '60%' }}
                                label='Title'
                                type='text'
                                value={edit_title}
                                onChange={this.handleChange('edit_title')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="description"
                                label="Body"
                                multiline
                                rows="14"
                                value={edit_body}
                                onChange={this.handleChange('edit_body')}
                                margin="normal"
                                variant="outlined"
                            />

                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.submit_edit}>Submit</Button>
                    </DialogActions>
                </Dialog >
            </Fragment>
        )
    }
}
export default TopUserPost