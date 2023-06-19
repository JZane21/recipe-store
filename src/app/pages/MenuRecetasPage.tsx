import { useContext, useMemo, useState } from "react";
import { StoreContext } from "../../context/ContextProvider";
import { Button, ButtonGroup, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { ItemList } from "../../components/ItemList";

export const MenuRecetasPage = () => {
  
  const context:any = useContext(StoreContext);

  setTimeout(() => {
    context.setSavedPage(false);
  },100);

  const [sortRaiting,setSortRaiting] = useState(false);
  const [sortTime,setSortTime] = useState(false);
  
  const ordenarPorRaiting = () => {
    let aux;
    if(!sortRaiting){
      setSortRaiting(true);
      aux = [...context.recetasList.sort((a,b) => b.rating - a.rating)];
      context.setRecetasList(aux);
    }else{
      setSortRaiting(false);
      aux = [...context.recetasList.sort((a,b) => a.id - b.id)];
      context.setRecetasList(aux);
    }
  };

  const ordenarPorTiempo = () => {
    let aux;
    if(!sortTime){
      setSortTime(true);
      aux = [...context.recetasList.sort((a,b) => a.tiempoPreparacion - b.tiempoPreparacion)];
      context.setRecetasList(aux);
    }else{
      setSortTime(false);
      aux = [...context.recetasList.sort((a,b) => a.id - b.id)];
      context.setRecetasList(aux);
    }
  };
  
  const BUTTONS = [
    {
      text:"tiempo elaboracion",
      action:()=>ordenarPorTiempo()
    },
    {
      text:"rating",
      action:()=>ordenarPorRaiting()
    }
  ];

  return (
    <section className="flex flex-col">
      <Typography variant="h6" noWrap component="div"
      sx={{marginLeft:2.5,marginBottom:2,marginTop:
      context.topBarWidth < 590 ? 3 :
      context.topBarWidth < 600 && context.topBarWidth >= 590 ? -6 :
      context.topBarWidth >= 600 && context.topBarWidth < 606 ? 3 : -6}}>
        Filtrar recetas por:
      </Typography>
      <ButtonGroup
      className="flex ml-[20px] shadow-none mb-3"
      sx={{boxShadow:'none',width:300}}
      variant="contained" aria-label="outlined primary button group">
        {
        BUTTONS.map(i => (
          <Button sx={{borderRadius:'10px'}} key={i.text}
          onClick={() => i.action()}>
            {i.text}
          </Button>
        ))
        }
      </ButtonGroup>
      <ImageList sx={{ width: "w-full", maxHeight: '400px', display:'flex',
      flexWrap:'wrap',justifyContent:'center'}}>
        {context.recetasList.filter((item)=>item.nombre.includes(context.recetaBuscada))
        .map((item) => (
          <ItemList key={item.img} item={item}/>
        ))}
      </ImageList>
    </section>
    
  );
};
