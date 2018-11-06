import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

})

class MemberPage extends Component {
    state = { stage: 1, text: '', email: '', username: '', password: '', text_two: '' }

    render() {
        return (
            <div>Hello</div>
        )
    }

}


export default withStyles(styles)(MemberPage)