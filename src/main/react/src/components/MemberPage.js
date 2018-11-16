import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserCard from './UserCard';
import { get_member } from '../api/Api.js'

const styles = theme => ({

})

class MemberPage extends Component {
    state = { username: 'loading', email: 'loading', mod: 'loading', bio: 'loading', post_list: 'loading', is_self: false }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    componentDidMount() {
        const member = this.props.location.pathname.substring(6, this.props.location.pathname.length)
        get_member(member).then(data => {
            let is_self = data.isSelf
            let { username, email, mod, bio } = data.member
            if (bio === null || bio === undefined) {
                bio = 'No bio given'
            }
            this.setState({ username, email, mod, bio, is_self })
        })
    }

    render() {
        const { username, email, mod, bio, post_list, is_self } = this.state
        return (
            <div>
                <UserCard handleChange={this.handleChange} email={email} username={username} bio={bio} is_mod={mod} is_self={is_self} />
            </div>
        )
    }

}


export default withStyles(styles)(MemberPage)