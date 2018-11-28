import React, {Component} from 'react'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton';
import FlagIcon from '@material-ui/icons/Flag'
import ThumbOutlined from '@material-ui/icons/ThumbUpOutlined'
import Post from './Post'
import Thumb from '@material-ui/icons/ThumbUp'
import Comment from '@material-ui/icons/Comment'
import Divider from '@material-ui/core/Divider';
import Delete from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { post_comment } from '../api/Api.js'

import {view_thread} from '../api/Api.js'
import { List } from '@material-ui/core';

const styles = {
    editorRoot: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    textField: {
        margin: '15px'
    },
    buttonDiv: {
      padding: 10,
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
        marginLeft: '10px',
        marginRight: '25px'
    }
};

class Thread extends Component {
  state = {parent_id: '', title: '', body: '', postLike: '', memberId: '', creationDate: '', children: [], text: '', loading: true}

  componentDidMount(){
    view_thread(this.props.match.params.id).then(data => {
      data.parent_id = data.postId
      data.loading = false
      this.setState(data)
    })
  }

  handleChange = name => event => {
      this.setState({
          [name]: event.target.value,
      })
  }

  submit_comment = (parent_id) => {
    post_comment(parent_id, this.state.text).then(data => {
      console.log(data)
    })
  }


  render_comments = () => {
    let comment_block = []
    const comments = this.state.children

    if (comments.length > 0){
      comments.forEach(element => {
        comment_block.push(<Post data={element}/>)
      })
    }

    return comment_block
  }

  render(){
    const {parent_id, title, body, creationDate, creator, loading} = this.state

    const createdAt = new Date(creationDate)
    const date = `${createdAt.getMonth() +
        1}/${createdAt.getDate()}/${createdAt.getFullYear()}`

    if (loading) {
      return <div>Loading</div>
    }

    return(
      <Card>
        <CardHeader
            avatar={<Avatar>{creator}</Avatar>}
            title={title}
            subheader={date}
        />
        <CardContent >
            <Typography
                style={{
                    hyphens: 'auto'
                }}
                variant="h6"
            >
                {body}
            </Typography>
        </CardContent>
        <div style={styles.editorRoot}>
            <TextField
                id="comment-text"
                label="Continue the conversation..."
                multiline
                rows="5"
                value={this.state.text}
                onChange={this.handleChange('text')}
                style={styles.textField}
                margin="normal"
                variant="outlined"
            />
            <div style={styles.buttonDiv}>
              <IconButton>
                  <FlagIcon />
              </IconButton>
              <IconButton onClick={() => this.props.edit_post(title, body, parent_id)}>
                  <EditIcon />
              </IconButton>
              <IconButton onClick={() => this.props.handle_vote(parent_id)}>
                  <ThumbOutlined />
              </IconButton>
              <IconButton>
                  <Delete />
              </IconButton>
              <Button variant="contained" style={styles.button} color='primary' onClick={() => this.submit_comment(parent_id)}>
                  Comment
              </Button>
            </div>
            <Divider/>
        </div>
        <List>
          {this.render_comments()}
        </List>
      </Card>
    )
  }
}


export default Thread