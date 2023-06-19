interface Props{
  children:JSX.Element
}

export const Modal = ({children}:Props) => {
  return (
    <section className="fixed left-0 right-0 top-0 bottom-0 flex flex-col
    justify-center items-center bg-slate-500 bg-opacity-50 z-10">
      {children}
    </section>
  );
};
