import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  briefTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#202124',
  },
  briefContent: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#a6adb4',
  },
});

/**
 * This component render a list of Grids, each render an item of brief according to the input array
 * @param {object[]} brief An array contains objects describing the brief items. Each object conatins
 * a fixed "type" attribute indicating it's type and a dynamic "content" field containing corresponding
 * data fetched from the back-end
 */
export default function Brief(props: any) {
  const { brief } = props;
  const classes = useStyles();

  return brief.map((item: any) => {
    return (
      <Grid item key={item.type}>
        <Typography className={classes.briefTitle}>{item.type}</Typography>
        <Typography className={classes.briefContent}>
          {typeof item.content === 'undefined' ? 'Unknown' : item.content}
        </Typography>
      </Grid>
    );
  });
}
