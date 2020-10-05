import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import AvatarUploader from './AvatarUploader/AvatarUploader';

const UploadAvatarDialog = ({ open, handleClose, handleAvatarUploaded }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-avatar-dialog"
    >
      <DialogTitle id="upload-avatar-dialog">Upload Avatar</DialogTitle>

      <DialogContent dividers>
        <AvatarUploader
          handleClose={handleClose}
          handleAvatarUploaded={handleAvatarUploaded}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UploadAvatarDialog;
