import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Post from './Post.js'
import { get_top_posts } from '../api/Api'

class TopUserPost extends Component {

    state = { posts: [], error: false }

    componentDidMount() {
        const { username } = this.props
        get_top_posts(username).then(data => {
            this.setState({ posts: data })
        })
    }

    get_list = () => {
        const { posts } = this.state
        if (posts === null || posts === undefined) {
            return <div>Hello</div>
        }
        let items = []
        console.log('posts:', posts)
        posts.forEach(element => {
            items.push(<Post data={element} key={element.num}></Post>)
        })

        return items
    }

    render() {
        return (
            <List style={{ width: '60%', margin: 15 }}>
                {this.get_list()}
            </List>
        )
    }
}
export default TopUserPost