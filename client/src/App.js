import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Grid, CircularProgress, TextField, Button, Container } from '@material-ui/core'
import { DeleteIcon } from '@material-ui/icons';
import { PostsContainer } from './components/posts/PostsContainer'
import { fetchPosts, createPost } from './redux/actions/postsActions'
import { SinglePost } from './components/posts/SinglePost'
// import useForm from './hooks/useForm' !!!!!
import { useForm } from "react-hook-form";

function App() {

  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.posts)
  const loadingPosts = useSelector(state => state.posts.loadingPosts)
  const titleInput = useRef(null)
  const { register, errors, handleSubmit, watch } = useForm();

  const [error, setError] = useState(false) // ??????????????????????????

  useEffect(() => {
    dispatch(fetchPosts())
    console.log(posts)
  }, [])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = async data => {
    await dispatch(createPost({ title: data.title, description: data.description, id: Date.now() }))
  }




  return (
    <Container>
      <Grid direction="column" container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid xs={12} item>
            <TextField fullWidth error={error} inputRef={register({ required: true })} name="title" label="Title" />
          </Grid>
          <Grid xs={12} item>
            <TextField fullWidth error={error} inputRef={register({ required: true })} name="description" multiline rows={3} label="Description" />
            <Button type="submit">Submit</Button>
          </Grid>

        </form>
        <Grid container direction="column">
          {
            (!loadingPosts) ? posts.map(post => (
              <SinglePost key={post.id} {...post} />
            )) : <CircularProgress />
          }
        </Grid>
        {/* <PostsContainer /> */}
      </Grid >
    </Container>
  );
}

export default App;
