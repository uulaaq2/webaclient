import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

const BDialog = ({ title = null, show = true, onClose = null, closeOnBackDropClick = () => null, children, ...rest }) => {
  const [open, setOpen] = useState(show)

  function handleClose() {
    if (onClose && typeof(onClose) === 'function') {
      onClose()
    }

    setOpen(false)
  }

  return (
    <Dialog 
      open={open}
      onClose={handleClose}
      onBackdropClick={closeOnBackDropClick}
      { ... rest }
    >
      { title ? 
          <DialogTitle>{ title }</DialogTitle>
        :
        ''
      }
      <DialogContent>
        { children }   
      </DialogContent>   
    </Dialog>
  );
};

export default BDialog