import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserCard from './UserCard';
import TopUserPost from './TopUserPost'
import { get_member, submit_edited_content } from '../api/Api.js'

const styles = theme => ({

})

class MemberPage extends Component {
    state = {
        username: 'loading',
        email: 'loading',
        mod: 'loading',
        bio: 'loading',
        post_list: 'loading',
        is_self: false,
        new_password: '',
        new_check: '',
        error: false
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    componentDidMount() {
        const member = this.props.location.pathname.substring(6, this.props.location.pathname.length)
        get_member(member).then(data => {
            let is_self = data.isSelf

            if (is_self) {
                localStorage.setItem('csi3370-user', data.member.username)
            }

            if (is_self && data.member.mod) {
                localStorage.setItem('csi-is-mod', true)
            }
            let banner_url = data.member.bannerUrl
            let { username, email, mod, bio } = data.member
            if (bio === null || bio === undefined) {
                bio = 'No bio given'
            }
            this.setState({ username, email, mod, bio, is_self, banner_url })
        }).catch(error => {
            console.log(error)
            this.setState({ error: true })
        })
    }

    submit_edit = () => {
        const { email, new_password, bio } = this.state
        const member = { email, password: new_password, bio }
        submit_edited_content(member)
    }

    render() {
        const { username, email, mod, bio, is_self, banner_url, new_password, new_check, error } = this.state

        if (error) {
            return (
                <div style={{ display: 'flex', width: '100vw', height: '90vh', justifyContent: 'center', alignItems: 'center' }}>
                    <div>Looks like that user doesn't exist! Sorry :(</div>
                </div>
            )
        }


        return (
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                {username !== 'loading' && <TopUserPost username={username} />}
                <UserCard handleChange={this.handleChange} email={email} banner_url={banner_url} new_password={new_password}
                    submit_edit={this.submit_edit} username={username} bio={bio} is_mod={mod} is_self={is_self} new_check={new_check} />
            </div>
        )
    }

}


export default withStyles(styles)(MemberPage)