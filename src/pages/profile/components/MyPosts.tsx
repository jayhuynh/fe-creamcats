import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PostCard from '../../../utils/post-card';
import CreatePost from '../../sharing-zone/components/CreatePost';

const useStyles = makeStyles({
  button: {
    border: '2px solid lightgrey',
    borderRadius: 6,
  },
});
export default function MyPosts(props: any) {
  const classes = useStyles();

  const { posts } = props;

  const postCards = posts.map((item: any) => {
    return (
      <Grid item key={item.title}>
        <PostCard
          key={item.title}
          coverURL={item.postCover}
          title={item.title}
          description={item.content}
          time={item.createdAt}
        />
      </Grid>
    );
  });

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item xs>
        <CreatePost/>
      </Grid>
      {postCards}
    </Grid>
  );
}
