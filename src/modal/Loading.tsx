import RefreshIcon from '@mui/icons-material/Refresh';

export const Loading = () => {

  return (
    <section className=' rounded-lg p-4 m-2 font-semibold
    flex flex-row justify-center items-center w-max h-max'>
      <figure className="bg-transparent text-lg text-white animate-spin
      h-5 w-5 mr-3">
        <RefreshIcon/>
      </figure>
      <h1 className="text-2xl text-white">CARGANDO</h1>
    </section>
  );
};
