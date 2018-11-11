import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserCard from './UserCard';
import { get_self } from '../api/Api.js'

const styles = theme => ({

})

class MemberPage extends Component {
    state = { username: 'loading', email: 'loading', mod: 'loading', bio: 'loading', post_list: 'loading' }

    componentDidMount() {
        get_self().then(data => {
            let { username, email, mod, bio } = data
            if (bio === null || bio === undefined) {
                bio = 'No bio given'
            }
            this.setState({ username, email, mod, bio })
        })
    }

    render() {
        const { username, email, mod, bio, post_list } = this.state
        return (
            <div>
                <UserCard username={username} bio={bio} is_mod={mod} />
            </div>
        )
    }

}


export default withStyles(styles)(MemberPage)