import { Grid } from '@material-ui/core';

import PostCard from '../../../utils/post-card';

export default function MyPosts(props: any) {
  const { posts } = props;

  const postCards = posts.map((item: any) => {
    return (
      <Grid item>
        <PostCard
          key={item.title}
          coverURL={item.postCover}
          title={item.title}
          description={item.description}
        />
      </Grid>
    );
  });

  return (
    <Grid container direction="column" spacing={4}>
      {postCards}
    </Grid>
  );
}
