import { Button, ButtonGroup, ImageListItem, ImageListItemBar } from "@mui/material";
import { memo, useContext } from "react";
import { StoreContext } from "../context/ContextProvider";

export const ItemList = memo((props)=>{
  const item = props.item;

  const context:any = useContext(StoreContext);

  return (
    <ImageListItem key={item.img} className="min-w-[200px] max-w-[320px]
    min-h-[200px] max-h-[300px] mt-4">
      <img
        className="rounded-2xl w-[300px] max-h-[180px]"
        src={`${item.img}?w=248&fit=crop&auto=format`}
        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={item.nombre}
        loading="lazy"
      />
      <ImageListItemBar
        title={item.nombre}
        subtitle={
        <div className="flex flex-col">
        <span>Técnica Culinaria: {item.tecnicaReceta}</span>
        <span>Cantidad Ingredientes: {item.cantidadIngredientes}</span>
        <span>Tiempo Preparacion: {item.tiempoPreparacion}</span>
        <span>Likes: {item.rating}</span>
        </div>
        }
        position="below"
      />
      <ButtonGroup
      className="flex shadow-none mb-3"
      sx={{boxShadow:'none',width:300}}
      variant="contained" aria-label="outlined primary button group">
        {
        context.BUTTONS_TWO.map(i => (
          <Button sx={{borderRadius:'10px',
        backgroundColor:
        item.saved && i.text==='guardar' ? "success.main" : 
        item.rated && i.text==='like' ? "success.main" : 
        "primary.main"}} key={i.text}
          onClick={() => {
            i.action(item.id);
          }}>
            {i.text}
          </Button>
        ))
        }
      </ButtonGroup>
    </ImageListItem>
  );
},(prevProps, nextProps) => {
  return ( 
    prevProps.item.rated===nextProps.item.rated && 
    prevProps.item.saved===nextProps.item.saved
  );
});
