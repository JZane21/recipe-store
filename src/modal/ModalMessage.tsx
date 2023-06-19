import { Box, Button, Typography } from "@mui/material";

interface Props{
  title:string,
  message:string,
  action:(bolean:boolean)=>void
}

export const ModalMessage = ({title,message,action}:Props) => {
  return (
    <Box
      sx={{
        width: 'max-content',
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'error.main',
        justifyContent: 'space-around',
        alignItems: 'center',
        p:5,
        borderRadius: 10
      }}
    >
      <Typography variant='h5' sx={{backgroundColor: 'error.main',
      color:'white', fontWeight: 700}}>
        {title}
      </Typography>
      <Typography variant='h6' sx={{backgroundColor: 'error.main',
      color:'white'}}>
        {message}
      </Typography>
      <Button variant="contained" className='uppercase'
      onClick={() => action(false)}>
        aceptar
      </Button>
    </Box>
  );
};
