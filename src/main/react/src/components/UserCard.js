import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    card: {
        maxWidth: 345,
        margin: 15
    },
    media: {
        objectFit: 'cover',
    },
    avatar: {
        backgroundColor: '#388e3c',
    },
});

class UserCard extends Component {
    render() {
        const { username, bio, image, is_mod, classes } = this.props

        let imgurl = image
        if (imgurl === null || imgurl === undefined) {
            imgurl = 'https://images8.alphacoders.com/876/thumb-1920-876413.jpg'
        }


        return (
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    alt="User banner picture"
                    className={classes.media}
                    height="140"
                    image={imgurl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {username}
                        </Typography>

                    </div>
                    <Typography component="p">
                        {bio}
                    </Typography>
                    {is_mod &&
                        <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                            This user is a moderator
                        </Typography>
                    }
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="medium" color="primary">
                        Message
                    </Button>
                    <Button size="medium" color="primary">
                        Flag
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);