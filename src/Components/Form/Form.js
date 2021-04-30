import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost} from '../../actions/posts';


const Form = ({ currentId, setcurrentId }) => {

    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector( (state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post)

    }, [post])


    const handleSubmit = (e) => {
        e.preventDefault();
        // nuestro dispatch requiere un parametro que sera nuestro estado
        if( currentId ) {
            dispatch(updatePost( currentId, postData))
        }else {
            dispatch(createPost(postData))
        }     

        clear();
    };


    const clear = () => { 
        setcurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: ''});
    }
    
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{ currentId ? 'Editing' : 'Creating' } a Memory</Typography>
                <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} 
                onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                {/* 2 textField */}
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} 
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                {/* 3 textField */}
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} 
                onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                {/* 4 textField */}
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} 
                onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
                />
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                {/* buttons */}
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
                    Submit
                </Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;
