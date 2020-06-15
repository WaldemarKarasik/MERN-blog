import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../../redux/actions/postsActions'
import { deletePost } from '../../redux/actions/postsActions'
import { Button, Paper, Grid, Box } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

export const SinglePost = ({ ...post }) => {
    const dispatch = useDispatch()

    return (
        <Paper style={{ height: '20rem', marginBottom: '3rem' }} elevation={3}>
            <Grid style={{ height: '100%' }} container item justify="space-between" direction="column">
                <Grid item >
                    <p>{post.title}</p>
                    <p>{post.description}</p>
                </Grid>
                <Grid item container justify="space-between">
                    <Box style={{ visibility: 'hidden' }}>Hello</Box>
                    <Button variant="primary.success" startIcon={<DeleteIcon />} onClick={() => { dispatch(deletePost(post.id)) }}>Delete</Button>
                </Grid>
            </Grid>
        </Paper>
    )

}