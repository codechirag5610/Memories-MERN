import React from 'react'
import { useSelector } from 'react-redux';

import Post from './Post/Post'
import useStyles from './styles.js';

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log(posts);
  return (
    <div>Posts
        <Post />
    </div>
  )
}

export default Posts