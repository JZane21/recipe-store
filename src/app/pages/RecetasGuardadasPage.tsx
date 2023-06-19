import { useContext, useEffect, useMemo } from "react";
import { StoreContext } from "../../context/ContextProvider";
import { ImageList, Typography } from "@mui/material";
import { ItemList } from "../../components/ItemList";

export const RecetasGuardadasPage = () => {

  const context:any = useContext(StoreContext);

  let nuevoNumero = useMemo(() => {
    return context.recetasGuardadas.filter(i => i.tiempoPreparacion<=60).length;
  },[context.recetasGuardadas]);

  return (
  <section className="flex flex-col">
    <>
      {
        useEffect(() => {
          setTimeout(() => {
            context.setSavedPage(true);
          },100)
        },[context.loading])
      }
    </>
    <Typography variant="h6" noWrap component="div"
    sx={{marginLeft:2.5,marginBottom:2,marginTop:
    context.topBarWidth < 590 ? 8 :
    context.topBarWidth < 600 && context.topBarWidth >= 590 ? 1 :
    context.topBarWidth >= 600 && context.topBarWidth < 606 ? 8 : 1}}>
      Recetas Rápidas (tiempo de preparación en 60 min o menos): {nuevoNumero} de {context.recetasGuardadas.length}
    </Typography>
    <ImageList sx={{ width: "w-full", height: '500px', display:'flex',
    flexWrap:'wrap',justifyContent:'center'}}>
      {context.recetasGuardadas.filter((item)=>item.nombre.includes(context.recetaBuscada))
      .map((item) => (
        <ItemList key={item.img} item={item}/>
      ))}
    </ImageList>
  </section>);
};
