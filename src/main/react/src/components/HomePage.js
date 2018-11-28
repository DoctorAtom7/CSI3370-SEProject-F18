import React, { Component, Fragment } from 'react';
import Post from "./Post";
import Typography from '@material-ui/core/Typography'
import { home_posts, like_post } from '../api/Api.js'

const style = {
    root: {
        padding: 15
    },
    noContent: {
        fontSize: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
}

class HomePage extends Component {

    state = { posts: [] }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    componentDidMount() {
        home_posts().then(data => {
            this.setState({ posts: data })
        })
    }

    handle_up_vote = (id) => {
        let postArray = this.state.posts

        like_post(id)

        for (let i = 0; i < postArray.length; i++) {
            if (postArray[i].postId === id && !postArray[i].voted) {
                postArray[i].postLike += 1
                postArray[i].voted = true
            }
        }

        this.setState({ posts: postArray })
    }

    get_list = () => {
        const { posts } = this.state
        if (posts === null || posts === undefined || posts.length === 0) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>
                        ¯\_(ツ)_/¯
                    </div>
                    <Typography variant="body1">
                        It looks like there's no content yet. You have a blank slate - start a conversation!
                    </Typography>
                </div>
            )

        }
        let items = []
        console.log('posts:', posts)
        posts.forEach(element => {
            items.push(<Post data={element} handle_vote={this.handle_up_vote} key={element.postId}></Post>)
        })

        return items
    }

    render() {
        const { posts } = this.state
        let rootstyle = style.root
        if (posts === null || posts === undefined || posts.length === 0) {
            rootstyle = style.noContent
        }

        return (
            <div style={rootstyle} >
                {this.get_list()}
            </div>
        )
    }
}

export default HomePage