import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, CardMedia, Fade, Grid, Typography } from '@material-ui/core';
import { CcImageList } from './index';
import AddIcon from '@material-ui/icons/Add';
import { useDebounce } from 'use-debounce';
import { FileService } from '../services';

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
    '&:hover': {
      cursor: 'pointer',
    },
  },
  addIcon: {
    fontSize: '7rem',
  },
}));

const UploadButton = ({ height }: any) => {
  const classes = useStyles();

  return (
    <Box height={height}
         bgcolor="#eaeaea"
         className={classes.uploadBtn}
         borderRadius={5}>
      <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.root}
        container>
        <AddIcon fontSize="large"/>
        <Box>
          Drag and drop your image
        </Box>
      </Grid>
    </Box>
  );
};

interface CcDropZoneProps {
  onChange: (files: string[]) => void;
  maxFiles: number;
}

const CcDropZone = ({ onChange, maxFiles }: CcDropZoneProps) => {
  const classes = useStyles();
  const [files, setFiles] = useState<any>([]);
  const [image, setImage] = useState<any>(null);
  const [debouncedImage] = useDebounce(image, 300);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: maxFiles,
    onDrop: acceptedFiles => {
      (async () => {
        const urls = await FileService.uploadImages(acceptedFiles);
        onChange(urls);
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file),
        })));
      })();

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
        <Fade in={debouncedImage} mountOnEnter unmountOnExit timeout={300}>
          <Box maxHeight={'100%'}>
            <img src={debouncedImage} width={'100%'}/>
          </Box>
        </Fade>
        { !debouncedImage ? <Box width="100%">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <UploadButton height={'500px'}/>
          </div>
        </Box> : <></>}
        { files.length > 0 ? <Box width={'100%'} paddingTop={2}>
          <Grid
            direction="row"
            justifyContent="center"
            alignItems="center"
            container>
            <Box width={'100%'}>
              <CcImageList
                items={files.map((file: any) => ({ path: file.preview, file: file }))}
                handleRemoveImage={handleRemoveImage}
                handleHoverImage={handleHoverImage}/>
            </Box>
          </Grid>
        </Box> : <></>}
      </Grid>
    </Box>
  );
};

export default CcDropZone;
