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
    media: {
        objectFit: 'cover',
    },
    avatar: {
        backgroundColor: '#388e3c',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    clipboardArea: {
        border: 'none',
        top: 0,
        left: 0,
        width: 1,
        height: 1
    }
});

class UserCard extends Component {
    state = { expanded: false, open: false }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    handle_submit = () => {
        this.props.submit_edit()
        this.setState({ open: false })
    }


    copyToClipboard = () => {
        try {
            const copyText = document.getElementById("copy-text-area")
            copyText.select()
            document.execCommand("copy")

        } catch (e) {
            console.error(e)
        }
    }

    renderButtons = (classes, is_self) => {
        if (is_self) {
            return (
                <Fragment >
                    <IconButton onClick={this.copyToClipboard}>
                        <ShareIcon />
                    </IconButton>
                    <IconButton onClick={() => this.setState({ open: true })} >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Fragment >
            )
        } else {
            return (
                <Fragment >
                    <IconButton>
                        <MessageIcon />
                    </IconButton>
                    <IconButton>
                        <FlagIcon />
                    </IconButton>
                    <IconButton onClick={this.copyToClipboard}>
                        <ShareIcon />
                    </IconButton>
                </Fragment >
            )
        }
    }

    render() {
        const { username, bio, image, is_mod, classes, is_self, email, banner_url, new_password, new_check } = this.props
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