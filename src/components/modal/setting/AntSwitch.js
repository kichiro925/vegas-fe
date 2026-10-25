import React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
      color: '#fff',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& .MuiSwitch-thumb': {
        backgroundColor: '#ffffff', // white thumb when checked
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#007bff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#adb5bd', // gray when unchecked
    transition: theme.transitions.create(['width', 'background-color'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 8,
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxSizing: 'border-box',
  },
}));

export default AntSwitch;