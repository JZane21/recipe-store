import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { EmojiFoodBeverageOutlined } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Autocomplete, TextField } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from '../../context/ContextProvider';
import { Link, Outlet } from 'react-router-dom';
import { Modal } from '../../modal/Modal';
import { Loading } from '../../modal/Loading';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export const AppLayout = () => {

  const context:any = useContext(StoreContext);

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const topBar = useRef();

  const handleResize = () => {
    context.setTopBarWidth(topBar?.current.clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  },[window.innerWidth]);

  return (
    <Box sx={{ display: 'flex' }}>
      <>
      {
        useEffect(() => {
          setTimeout(() => {
            context.setLoading(true);
          },1000)
        },[context.loading])
      }
      </>
      {
      !context.loading && (
        <Modal>
          <Loading/>
        </Modal>
      )
      }
      <CssBaseline />
      <AppBar position="fixed" open={open} className='p-2' ref={topBar}>
        <Toolbar className='flex flex-row justify-start flex-wrap'
        >
          <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div"
          sx={{marginRight:3.5}}>
            Recetas Culinarias
          </Typography>

          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            sx={{width:300,backgroundColor:'white',height:'max-content',
            borderRadius:2,p:1}}
            options={context.recetasList.map((option) => option.nombre)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar Receta"
                onSelect={(event) =>
                context.setRecetaBuscada(event.target.value)}
                onChange={(event) =>
                context.setRecetaBuscada(event.target.value)}
                value={context.recetaBuscada}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{p:0}}>
          <IconButton onClick={handleDrawerClose} className='w-full'
          sx={{borderRadius:0,p:2}}>
            <Typography variant="h6" noWrap component="div"
            sx={{marginRight:3.5}}>
              Opciones
            </Typography>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Recetas Guardadas', 'Recetas Culinarias', 'salir'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link to={`${text==="Recetas Guardadas" ?
              "recetas-guardadas" : text==="Recetas Culinarias" ?
              "recetas-menu" : "/auth/login"}`} className='w-[100%]'>
                <ListItemButton>
                  <ListItemIcon>
                    {text === "Recetas Guardadas" ? <InboxIcon/> :
                    text === "Recetas Culinarias" ? <EmojiFoodBeverageOutlined/> :
                    <LogoutIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader/>
        <section className='fixed left-0 right-0 top-[90px] bottom-0
        flex justify-center items-center'>
          <Outlet/>
        </section>
      </Main>
    </Box>
  );
};
