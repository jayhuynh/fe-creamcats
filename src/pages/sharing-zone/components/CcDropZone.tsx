import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Fade, Grid, Typography } from '@material-ui/core';
import { CcImageList } from '../../../utils';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
  },
  closeButton: {
    height: 0,
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
  input: {
    display: 'none',
  },
  uploadBtn: {
    height: '20rem',
  },
  addIcon: {
    fontSize: '7rem',
  },
}));

const CcDropZone = (props: any) => {
  const classes = useStyles();
  const [files, setFiles] = useState<any>([]);
  const [image, setImage] = useState<any>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })));
    },
  });

  useEffect(() => {
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    setImage(null);
    URL.revokeObjectURL(image);
  }, [files]);

  const handleHoverImage = (file: any) => {
    setImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = (file: any) => {
    const newFiles = files.filter((item: any) => item !== file);
    setFiles(newFiles);
    setImage(null);
  };

  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ background: '#eaeaea', fontSize:18, color:'#bfc4c9', textAlign:'center', overflow:'hidden' }}
      >
        <Box style={{ width:'100%', minHeight:'160px' }}>
        <Fade in={image} mountOnEnter unmountOnExit timeout={300}>
          <Box style={{ width:'100%', height:'100%' }}>
            <img src={image} width={'100%'}/>
          </Box>
        </Fade>
        </Box>
        {files.length === 0 && <Box style={{ width: '100%' }}>
          <div {...getRootProps({ className: 'dropzone' })} 
        >
            <input {...getInputProps()} />
            <AddIcon style={{ fontSize:76, marginTop:0 }}></AddIcon>
            <p style={{ margin:'-10px 0 0' }}>Add your cover</p>
          </div>
        </Box>}
        <Box style={{ height:'184px' }}>
          <CcImageList
            items={files.map((file: any) => ({ path: file.preview, file: file }))}
            handleRemoveImage={handleRemoveImage}
            handleHoverImage={handleHoverImage}/>
        </Box>
      </Grid>
    </Box>
  );
};

export default CcDropZone;
