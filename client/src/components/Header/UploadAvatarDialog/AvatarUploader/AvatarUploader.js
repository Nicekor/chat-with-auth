import React, { useCallback, useContext, useEffect, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Slider,
  Typography,
} from '@material-ui/core';
import { AddAPhoto, Cancel, Save, ZoomIn, ZoomOut } from '@material-ui/icons';
import { UserAvatarContext } from '../../../../context/UserAvatarCtx';

const useStyles = makeStyles((theme) => {
  return {
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatarEditor: {
      marginBottom: theme.spacing(2),
    },
    inputFile: {
      display: 'none',
    },
    zoomText: {
      marginTop: theme.spacing(2),
    },
    cancelBtn: {
      marginRight: theme.spacing(2),
    },
    backdrop: {
      zIndex: theme.zIndex.appBar + 1,
      color: '#fff',
    },
  };
});

const canvasWidth = 160;
const canvasHeight = 160;
const maxSliderValue = 100;
const AvatarUploader = ({ handleClose }) => {
  const classes = useStyles();
  const [avatarFile, setAvatarFile] = useState(null);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [editor, setEditor] = useState(null);
  const [avatarBlob, setAvatarBlob] = useState(null);
  const [zoom, setZoom] = useState(0);
  const [originalPicDimensions, setOriginalPicDimensions] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { setAvatar } = useContext(UserAvatarContext);

  const uploadAvatar = useCallback(async (data) => {
    try {
      setIsUploading(true);
      const res = await fetch(
        'http://192.168.1.157:5000/api/attachment/avatar',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: data,
        }
      );
      const avatarBlob = await res.blob();
      setAvatarBlob(avatarBlob);
    } catch (err) {
      console.error(err);
    }
    setIsUploading(false);
  }, []);

  useEffect(() => {
    if (isSubmitting && editor && avatarFile && originalPicDimensions) {
      const avatarPos = editor.getCroppingRect();
      const data = new FormData();
      data.append('picFile', avatarFile);
      data.append('avatarPos', JSON.stringify(avatarPos));
      data.append('picDimensions', JSON.stringify(originalPicDimensions));
      uploadAvatar(data);
    }

    return () => {
      setisSubmitting(false);
    };
  }, [isSubmitting, editor, avatarFile, originalPicDimensions, uploadAvatar]);

  useEffect(() => {
    if (avatarBlob) {
      setAvatar(URL.createObjectURL(avatarBlob));
      handleClose();
    }
  }, [avatarBlob, setAvatar, handleClose]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setisSubmitting(true);
  };

  const setEditorRef = (editor) => {
    setEditor(editor);
  };

  const onEditorLoadSuccess = (imgInfo) => {
    setOriginalPicDimensions({
      width: imgInfo.resource.width,
      height: imgInfo.resource.height,
    });
  };

  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const onZoomChange = (e, newZoom) => {
    setZoom(newZoom);
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={onFormSubmit}
      className={classes.formWrapper}
    >
      <AvatarEditor
        ref={setEditorRef}
        image={avatarFile}
        width={canvasWidth}
        height={canvasHeight}
        border={25}
        borderRadius={canvasWidth / 2}
        scale={zoom / maxSliderValue + 1}
        className={classes.avatarEditor}
        onLoadSuccess={onEditorLoadSuccess}
      />

      <input
        accept="image/*"
        className={classes.inputFile}
        name="avatar"
        id="upload-file-button"
        type="file"
        onChange={onFileChange}
      />
      <label htmlFor="upload-file-button">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddAPhoto />}
          component="span"
        >
          Upload
        </Button>
      </label>

      <Typography id="zoom-slider" className={classes.zoomText}>
        Zoom
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <ZoomOut />
        </Grid>
        <Grid item xs>
          <Slider
            value={zoom}
            onChange={onZoomChange}
            aria-labelledby="zoom-slider"
            min={0}
            max={maxSliderValue}
            disabled={!originalPicDimensions}
          />
        </Grid>
        <Grid item>
          <ZoomIn />
        </Grid>
      </Grid>

      <Box display="flex" padding={1}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}
          startIcon={<Cancel />}
          className={classes.cancelBtn}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          startIcon={<Save />}
          disabled={!originalPicDimensions}
        >
          Save
        </Button>
      </Box>

      <Backdrop className={classes.backdrop} open={isUploading}>
        <CircularProgress />
      </Backdrop>
    </form>
  );
};

export default AvatarUploader;
