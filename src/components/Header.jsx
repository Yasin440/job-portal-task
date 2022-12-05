import React, { Fragment } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import useAuth from '../customHooks/useAuth';
import { toast } from 'react-toastify';

const pages = [{ name: 'Posts', link: '/all_job_post' }, { name: 'Add Post', link: '/add_new_job_post' }];
const settings = ['Profile', 'Account', 'Dashboard'];

function Header() {
   const [anchorElNav, setAnchorElNav] = React.useState(null);
   const [anchorElUser, setAnchorElUser] = React.useState(null);

   const { user, setLogout } = useAuth();
   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };
   const handleLogOut = () => {
      localStorage.clear('authToken');
      setLogout(true)
      toast.success('Log Out Successful');
   }
   return (
      <Fragment>
         <AppBar position="static">
            <Container maxWidth="xl">
               <Toolbar disableGutters>
                  <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                  <Typography
                     variant="h6"
                     noWrap
                     sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                     }}
                  >
                     LOGO
                  </Typography>
                  {!user &&
                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                           size="large"
                           aria-label="account of current user"
                           aria-controls="menu-appbar"
                           aria-haspopup="true"
                           onClick={handleOpenNavMenu}
                           color="inherit"
                        >
                           <MenuIcon />
                        </IconButton>
                        <Menu
                           id="menu-appbar"
                           anchorEl={anchorElNav}
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                           }}
                           keepMounted
                           transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                           }}
                           open={Boolean(anchorElNav)}
                           onClose={handleCloseNavMenu}
                           sx={{
                              display: { xs: 'block', md: 'none' },
                           }}
                        >
                           {pages.map((page, index) => (
                              <Link key={index} to={page.link}>
                                 <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                 </MenuItem>
                              </Link>
                           ))}
                        </Menu>
                     </Box>
                  }
                  <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                  <Typography
                     variant="h5"
                     noWrap
                     component="a"
                     href=""
                     sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                     }}
                  >
                     LOGO
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                     {pages.map((page, index) => (
                        <NavLink key={index} to={page.link}>
                           <Button
                              onClick={handleCloseNavMenu}
                              sx={{ my: 2, color: 'white', display: 'block' }}
                           >
                              {page.name}
                           </Button>
                        </NavLink>
                     ))}
                  </Box>
                  {user ?
                     <>
                        <Box sx={{ flexGrow: 0 }}>
                           <Tooltip title="Open settings">
                              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                              </IconButton>
                           </Tooltip>
                           <Menu
                              sx={{ mt: '45px' }}
                              id="menu-appbar"
                              anchorEl={anchorElUser}
                              anchorOrigin={{
                                 vertical: 'top',
                                 horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                 vertical: 'top',
                                 horizontal: 'right',
                              }}
                              open={Boolean(anchorElUser)}
                              onClose={handleCloseUserMenu}
                           >
                              {settings.map((setting) => (
                                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                 </MenuItem>
                              ))}
                           </Menu>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                           <MenuItem onClick={handleLogOut}>
                              <Typography sx={{ color: '#fff' }} textAlign="center">LogOut</Typography>
                           </MenuItem>
                        </Box>
                     </>
                     :
                     <Box sx={{ display: 'flex' }}>
                        <NavLink to='/login'>
                           <MenuItem>
                              <Typography sx={{ color: '#fff' }} textAlign="center">LogIn</Typography>
                           </MenuItem>
                        </NavLink>
                        <NavLink to='/sign_up'>
                           <MenuItem>
                              <Typography sx={{ color: '#fff' }} textAlign="center">SignUp</Typography>
                           </MenuItem>
                        </NavLink>
                     </Box>
                  }
               </Toolbar>
            </Container>
         </AppBar>
         <Outlet />
      </Fragment>
   );
}
export default Header;