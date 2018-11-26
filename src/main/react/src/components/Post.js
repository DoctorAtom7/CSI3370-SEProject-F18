import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'

const ListItemStyles = {
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
        width: '100%'
    },
    card: {
        display: 'flex',
        flex: 1
    },
    cardContent: {
        paddingLeft: '18px'
    },
    voteSection: {
        display: 'flex',
        alignItems: 'center'
    },
    voteButtons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    voteCount: {
        marginRight: 20,
        fontSize: '24px'
    }
}

class Post extends Component {

    render() {
        let { data } = this.props
        let style = ListItemStyles
        const createdAt = new Date(data.date)
        const date = `${createdAt.getMonth() +
            1}/${createdAt.getDate()}/${createdAt.getFullYear()}`


        return (
            <ListItem style={style.listItem} key={data.id}>
                <Card style={style.card}>
                    <div style={{ width: '100%' }}>
                        <CardHeader
                            avatar={<Avatar aria-label={data.category}>{data.creator.id}</Avatar>}
                            title={data.title}
                            subheader={date}
                        />
                        <CardContent style={style.cardContent}>
                            <Typography
                                style={{
                                    hyphens: 'auto'
                                }}
                                variant="body1"
                            >
                                {data.body}
                            </Typography>
                        </CardContent>
                    </div>
                    <div style={style.voteSection}>
                        <div style={style.voteButtons}>
                            <IconButton>
                            </IconButton>
                            <IconButton
                                onClick={() => this.handleVote(data.id, data.createdAt, -1)}
                            >
                            </IconButton>
                        </div>
                        <Typography variant="body1" style={style.voteCount}>
                            {data.likes}
                        </Typography>
                    </div>
                </Card>
            </ListItem>
        )
    }
}

export default Post