import React, { Component, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit'
import EditMember from './EditMember';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlagIcon from '@material-ui/icons/Flag';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message'
import PropTypes from 'prop-types';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        width: 400,
        maxHeight: 350,
        margin: 15,
    },
    expandedCard: {
        width: 400,
        margin: 15,
    },
});

class UserCard extends Component {
    state = { reported_list: [] }

    componentDidMount() {

    }

    render() {
        const { open, expandOpen } = this.state
        let imgurl = image
        if (imgurl === null || imgurl === undefined) {
            imgurl = 'https://upload.wikimedia.org/wikipedia/commons/1/17/Aquarius_Proprius_4_Orange-Blue_%287251980240%29.jpg'
        }

        let cardRoot = classes.card
        if (this.state.expanded) { cardRoot = classes.expandedCard }

        return (
            <Card className={cardRoot}>
                <CardMedia
                    component="img"
                    alt="User banner picture"
                    className={classes.media}
                    height="140"
                    image={banner_url}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {username}
                        </Typography>

                    </div>
                    <Typography variant="body1">
                        {bio}
                    </Typography>
                    {is_mod &&
                        <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                            This user is a moderator
                        </Typography>
                    }
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {this.renderButtons(classes, is_self)}
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            Email
                        </Typography>
                        <Typography paragraph>
                            {email}
                        </Typography>
                        <Typography paragraph>Account Birthday</Typography>
                        <Typography paragraph>
                            To be added later
                        </Typography>
                    </CardContent>
                </Collapse>
                <input className={classes.clipboardArea}
                    id="copy-text-area"
                    readOnly={true}
                    value={'localhost:3000/user/' + username}
                />
                <EditMember
                    handleChange={this.props.handleChange}
                    handleSubmit={this.handle_submit}
                    new_password={new_password}
                    new_check={new_check}
                    username={username}
                    email={email}
                    bio={bio}
                    open={open}
                    onClose={() => this.setState({ open: false })} />
            </Card>
        )
    }
}

UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);
