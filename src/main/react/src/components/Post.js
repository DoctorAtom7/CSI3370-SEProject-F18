import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit'
import FlagIcon from '@material-ui/icons/Flag'
import ThumbOutlined from '@material-ui/icons/ThumbUpOutlined'
import Thumb from '@material-ui/icons/ThumbUp'
import Comment from '@material-ui/icons/Comment'
import Delete from '@material-ui/icons/Delete'
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { delete_post, flag_post } from '../api/Api';

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
    cardRoot: {
        display: 'flex',
        flexDirection: 'column',
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
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
}

class Post extends Component {

    thread_id = () => {
        if (this.props.data.comment) {
            return this.props.data.parentId
        }
        return this.props.data.postId
    }

    show_edit = () => {
        return (localStorage.getItem('csi3370-user') === this.props.data.creator.username)
    }

    show_delete = () => {
        let isMod = false;
        if (localStorage.getItem('csi-is-mod') === 'true') {
            isMod = true
        }
        return (isMod || localStorage.getItem('csi3370-user') === this.props.data.creator.username)
    }

    render() {
        let { data } = this.props
        let style = ListItemStyles
        const createdAt = new Date(data.creationDate)
        const date = `${createdAt.getMonth() +
            1}/${createdAt.getDate()}/${createdAt.getFullYear()}`


        return (
            <ListItem style={style.listItem} key={data.id}>
                <Card style={style.cardRoot}>
                    <div style={style.card}>
                        <div style={{ width: '100%' }}>
                            <CardHeader
                                avatar={<Avatar aria-label={data.category}>{data.creator.username}</Avatar>}
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
                                >
                                </IconButton>
                            </div>
                            <Typography variant="body1" style={style.voteCount}>
                                {data.postLike}
                            </Typography>
                        </div>
                    </div>
                    <div style={style.buttonRow}>
                        <IconButton component={Link} to={"/post/" + this.thread_id()}>
                            <Comment />
                        </IconButton>
                        {localStorage.getItem('csi-is-mod') && <IconButton onClick={() => flag_post(this.props.data.postId)}>
                            <FlagIcon />
                        </IconButton>}
                        {this.show_edit() && < IconButton onClick={() => this.props.edit_post(data.title, data.body, data.postId)}>
                            <EditIcon />
                        </IconButton>}
                        {localStorage.getItem('forum-token') !== null &&
                            <IconButton onClick={() => this.props.handle_vote(data.postId)}>
                                <ThumbOutlined />
                            </IconButton>
                        }
                        {this.show_delete() && <IconButton onClick={() => delete_post(this.props.data.postId)}>
                            <Delete />
                        </IconButton>}
                    </div>
                </Card>
            </ListItem >
        )
    }
}

export default Post