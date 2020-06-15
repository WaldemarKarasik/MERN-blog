import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Grid, CircularProgress, TextField, Button, Container } from '@material-ui/core'
import { DeleteIcon } from '@material-ui/icons';
import { PostsContainer } from './components/posts/PostsContainer'
import { fetchPosts, createPost } from './redux/actions/postsActions'
import { SinglePost } from './components/posts/SinglePost'
// import useForm from './hooks/useForm' !!!!!
import { useForm } from "react-hook-form";
import { useTheme } from '@material-ui/core/styles'

function App() {

  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.posts)
  const loadingPosts = useSelector(state => state.posts.loadingPosts)
  const titleInput = useRef(null)
  const { register, errors, handleSubmit, watch } = useForm();
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    // if (Object.entries(errors).length > 0) {
    //   setTitleError(true)
    // }
    const errorsArr = Object.entries(errors)


  }, [errors])

  const onSubmit = async data => {
    await dispatch(createPost({ title: data.title, description: data.description, id: Date.now() }))
  }

  const theme = useTheme()

  console.log(theme)


  return (
    <Container>
      <Grid direction="column" container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid xs={12} item>
            <TextField error={titleError} onChange={() => setTitleError(false)} fullWidth inputRef={register({ required: true })} name="title" label="Title" />
          </Grid>
          <Grid xs={12} item>
            <TextField onChange={() => setDescriptionError(false)} error={descriptionError} fullWidth inputRef={register({ required: true })} name="description" multiline rows={3} label="Description" />
            <Button color="inherit" type="submit">Submit</Button>
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
