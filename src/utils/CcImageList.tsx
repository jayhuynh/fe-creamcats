import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'none',
    },
  }),
);

interface CcImageListProps {
  items: {
    path: string
    file: any
  }[];
  handleHoverImage: (url: string) => void;
  handleRemoveImage: (file: any) => void;
}

const CcImageList = (props: CcImageListProps) => {
  const classes = useStyles();
  const { items, handleHoverImage, handleRemoveImage } = props;

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList}>
        {items.map(item => (
          <ImageListItem key={item.path} onMouseEnter={(event: any) => (handleHoverImage(item.file))}>
            <img src={item.path}/>
            <ImageListItemBar
              title=""
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${''}`}>
                  <DeleteIcon onClick={event => handleRemoveImage(item.file)} color="secondary"/>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default CcImageList;
