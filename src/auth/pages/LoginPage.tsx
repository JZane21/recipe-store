import { FieldValues, useForm } from 'react-hook-form';
import { AuthLayout } from '../layout/AuthLayout';
import { useContext, useState } from 'react';
import { StoreContext, useDispatch } from '../../context/ContextProvider';
import { Button, Typography } from '@mui/material';
import { getUserByEmail } from '../../services/usersService';
import { Modal } from '../../modal/Modal';
import { ModalMessage } from '../../modal/ModalMessage';
import { useNavigate } from 'react-router-dom';
import { types } from "../../context/storeReducer";

export const LoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const context:any = useContext(StoreContext);

  const bgC:string = `bg-secondary${context.colorT()}`

  const cssInputForm:string = 'p-2 outline-none m-1 mb-3 rounded-lg shadow-lg';

  const errorCss:string = 'text-white rounded-lg p-2 m-1 right-1 w-max';

  const [errorLogin, setErrorLogin] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const sumbitAnswer = async (dataForm:FieldValues) => {
    const userGotten = (await getUserByEmail(dataForm.emailUser));
    const {data} = userGotten===null ? {data:null} : userGotten;
    if(!data){
      setErrorLogin(true);
    }else{
      if(data.id===dataForm.emailUser && dataForm.userPassword===data.password){
        dispatch({ type: types.login });
        context.setPushedButtonLogin(true);
        navigate(`/app/menu/recetas-menu`);
      }else{
        setErrorLogin(true);
      }
    }
  };

  const SUBMIT_ORDERS = [
    {
      errorType: errors.emailUser,
      textError: 'email requerido',
      placeHolder: 'email',
      registerPlace: 'emailUser',
    },
    {
      errorType: errors.userPassword,
      textError: 'contraseña requerida',
      placeHolder: 'contraseña',
      registerPlace: 'userPassword',
    },
  ];

  return (
    <>
      <AuthLayout title='Recetas Web'>
        <>
        {errorLogin && (
          <>
            <Modal>
              <ModalMessage
              title="ERROR"
              message="El usuario o contraseña son incorrectos"
              action={setErrorLogin}
              />
            </Modal>
          </>
        )}
        <form
        className={`flex flex-col rounded-lg ${bgC}`}
        onSubmit={handleSubmit((data) => sumbitAnswer(data))}>
          {
          SUBMIT_ORDERS.map(item => (
            <div key={item.textError}>
              {item.errorType && 
              <Typography sx={{backgroundColor: 'error.main'}}
              className={errorCss}>
                {item.textError}
              </Typography>}
              <input className={cssInputForm} placeholder={item.placeHolder}
              {...register(item.registerPlace, { required: true })} />
            </div>
          ))
          }

          <Button variant="contained" className='uppercase' type='submit'>
            enviar
          </Button>
        </form>
        </>
      </AuthLayout>
    </>
  );
};
