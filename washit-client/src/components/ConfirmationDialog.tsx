
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import { WashType } from '../models/WashType';

export interface ConfirmationDialogProps {
    keepMounted: boolean;
    open: boolean;
    machineId: number,
    date: Date | undefined,
    washType: WashType,
    onClose: (confirm: boolean) => void;
  }

function ConfirmationDialog(props: ConfirmationDialogProps) {
    const { onClose, open, machineId, washType, date, ...other } = props;
  
    const handleCancel = () => {
      onClose(false);
    };
  
    const handleOk = () => {
      onClose(true);
    };

    const washTypeString = () => {
        switch(washType) {
            case WashType.Kokvask.toString():
                return 'kokvask'
            case WashType.Handvask.toString():
                return 'håndvask'
            case WashType.Toyvask.toString():
                return 'tøyvask'
        }
    }
  
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
        {...other}
      >
        <DialogTitle>Bekreft reservasjon</DialogTitle>
        <DialogContent dividers>
          Vennligst bekreft reservasjon for {washTypeString()} på vaskemaskin {machineId} for dato: {date?.toISOString()}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            avbryt
          </Button>
          <Button onClick={handleOk}>Bekreft</Button>
        </DialogActions>
      </Dialog>
    );
}

export default ConfirmationDialog