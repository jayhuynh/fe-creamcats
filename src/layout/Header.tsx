import React from 'react';
import { Avatar, Grid, Typography, Menu } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyles = makeStyles(() => ({
  'top-menu': {
    color: 'gray',
    fontSize: '14px',
    lineHeight: '30px',
    '& span': {
      display: 'inline-block',
      margin: '0 20px',
      cursor: 'pointer',
    },
    '& span:hover': {
      color: '#343638',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 50, background: '#f6f8f9', padding: '0 10px' }}>
      <Typography style={{ color: '#fa6980', fontSize: 13, flex: 1 }}>LOGO</Typography>

      <Grid container>
        <Grid container item justifyContent="flex-start"></Grid>
        <Grid container item justifyContent="flex-end">
          <Grid item className={classes['top-menu']}>
            <span style={{ color: '#343638' }}>
              <Typography>HOME</Typography>
            </span>
            <span>
              <Typography>OPPORTUNITIES</Typography>
            </span>
            <span>
              <Typography>ABOUT US</Typography>
            </span>
          </Grid>
          <Grid item>
            
            <Avatar
             onClick={handleToggle}
              style={{ backgroundColor: 'orange', width: 30, height: 30, marginLeft: 10 }}
            >
            <span 
             ref={anchorRef}
             >N</span>
            </Avatar>

            <Popper open={open} anchorEl={anchorRef.current} placement='bottom-end' role={undefined} transition disablePortal>
              {({ TransitionProps }) => (
                <Grow
                  {...TransitionProps}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList  id="menu-list-grow">
                        <MenuItem onClick={handleClose}>Logout&nbsp; <ExitToAppIcon></ExitToAppIcon></MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
