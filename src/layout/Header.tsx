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
import { fromAuth, useAppDispatch } from '../store';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
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
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(fromAuth.doLogout());
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
    <div
      style={{
        fontFamily: 'HelveticaNeue-bold',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        background: '#f6f8f9',
        padding: '0 10px',
      }}
    >
      <Grid container style={{ display: 'flex', flex: 1 }}>
        <Grid container item style={{ display: 'flex', flex: 1 }}>
          <Typography style={{ color: '#fa6980', lineHeight: '30px', marginRight: 42 }}>LOGO</Typography>

          <Grid item className={classes['top-menu']}>
            <span style={{ color: '#343638' }}>
              <Typography>Home</Typography>
            </span>
            <span>
              <Typography>Opportunities</Typography>
            </span>
            <span>
              <Typography>About Us</Typography>
            </span>
          </Grid>
        </Grid>

      </Grid>
      <Grid style={{ display: 'flex', alignItems: 'center' }}>
        <SearchIcon></SearchIcon>
        <NotificationsIcon style={{ margin:'0 20px' }}></NotificationsIcon>
        <Avatar onClick={handleToggle} style={{ backgroundColor: 'orange', width: 30, height: 30, marginLeft: 10 }}>
          <span ref={anchorRef}>N</span>
        </Avatar>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="menu-list-grow">
                    <MenuItem onClick={handleLogout}>
                      Logout&nbsp; <ExitToAppIcon></ExitToAppIcon>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </div>
  );
};

export default Header;
