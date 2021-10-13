import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Fade, Grid, Typography } from '@material-ui/core';
import { CcImageList } from './index';

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
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Fade in={image} mountOnEnter unmountOnExit timeout={300}>
          <Box>
            <img src={image} width={'100%'}/>
          </Box>
        </Fade>
        <Box>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </Box>
        <Box width={'100%'}>
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
