import React, { Component, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';
import { get_reported_posts, delete_post, get_reported_users } from '../api/Api';

const styles = {
    card: {
        width: 400,
        maxHeight: 350,
        margin: 15,
    },
}

class ReportedList extends Component {
    state = { reported_list: [], reported_users: [] }

    componentDidMount() {
        get_reported_posts().then(data => {
            this.setState({ reported_list: data })
        })

        get_reported_users().then(data => {
            this.setState({ reported_users: data })
        })
    }

    render_list = () => {
        const { reported_list, reported_users } = this.state
        let items = []

        if (reported_list === undefined || reported_users === undefined) {
            return null
        }

        reported_list.forEach(e => {
            items.push(
                <ListItem>
                    <ListItemText
                        primary={e.title}
                        secondary={e.body}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => delete_post(e.postId)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })

        reported_users.forEach(e => {
            items.push(
                <ListItem>
                    <ListItemText
                        primary={e.title}
                        secondary={e.body}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => delete_post(e.postId)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })

        if (reported_list.length === 0 && reported_users.length === 0) {
            return <div>Yay! There are no flagged posts!</div>
        }

        return items
    }

    render() {
        return (
            <Card style={styles.card}>
                <CardContent>
                    <Typography variant="h6">
                        Flagged Posts for your attention
                    </Typography>
                    <List dense>
                        {this.render_list()}
                    </List>
                </CardContent>
            </Card>
        )
    }
}



export default ReportedList;