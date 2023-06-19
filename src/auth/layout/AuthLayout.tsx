import { Grid, Typography } from "@mui/material";

interface Props{
  title:string,
  children:JSX.Element
}

export const AuthLayout = ({children,title}:Props) => {
  return (
    <Grid
    container
    className="fixed left-0 right-0 top-0 bottom-0 justify-center items-center"
    spacing={ 0 }
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ backgroundColor: 'primary.main', padding: 4 }}
    >
      <Typography className="text-white"
      variant='h5' sx={{ mb: 1, fontWeight:700 }}>{ title }</Typography>
      <Grid item
      className='box-shadow max-w-[350px] min-w-[200px] shadow-2xl'
      xs={ 3 }
      sx={{ 
        backgroundColor: 'secondary.main', 
        padding: 3, 
        borderRadius: 2 
      }}>
        { children }
      </Grid>
    </Grid>
  );
};
