import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'
import ArrowDropDown from 'material-ui-icons/ArrowDropDown'
import ArrowDropUp from 'material-ui-icons/ArrowDropUp'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = () => ({
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
})

class Comment extends Component {
    render() {
        const { title, id, body, voteCount, handleVote } = this.props
        return (
            <ListItem style={style.listItem} key={idea.id}>
                <Card style={style.card}>
                    <div style={{ width: '100%' }}>
                        <CardHeader
                            avatar={<Avatar aria-label={idea.category}>{idea.avatar}</Avatar>}
                            title={title}
                            subheader={date}
                        />
                        <CardContent style={style.cardContent}>
                            <Typography
                                style={{
                                    hyphens: 'auto'
                                }}
                                component="p"
                            >
                                {description}
                            </Typography>
                        </CardContent>
                    </div>
                    <div style={style.voteSection}>
                        <div style={style.voteButtons}>
                            <IconButton
                                onClick={() => this.handleVote(id, idea.createdAt, 1)}
                            >
                                <ArrowDropUp style={arrowStyle.up} />
                            </IconButton>
                            <IconButton
                                onClick={() => this.handleVote(id, idea.createdAt, -1)}
                            >
                                <ArrowDropDown style={arrowStyle.down} />
                            </IconButton>
                        </div>
                        <Typography component="p" style={style.voteCount}>
                            {this.state.voteCount}
                        </Typography>
                    </div>
                </Card>
            </ListItem>
        )
    }

}

export default withStyles(styles)(Comment)