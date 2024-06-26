import React from 'react';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import Logo from './shared/Logo';


const Header = () => {
  return (
    <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
      <Toolbar sx={{display:"flex"}} className='bg-zinc-600'>
        <Logo />

      </Toolbar>
    </AppBar>
  )
};

export default Header
