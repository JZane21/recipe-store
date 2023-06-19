import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { initialValues, storeReducer } from "./storeReducer";
import { getRecetasList } from "../services/usersService";

export const StoreContext = createContext({});
export const LoginContext = createContext({});

interface Props{
  children:JSX.Element
}

export const StoreProvider = ({children}:Props) => {
  return (
    <LoginContext.Provider value={useReducer(storeReducer, initialValues)}>
      {children}
    </LoginContext.Provider>
  );
};

export const SecondStoreProvider = ({children}:Props) => {
  
  const [themeMode,setThemeMode] = useState(false);
  const [recetasList,setRecetasList] = useState([]);
  const [pushedButtonLogin,setPushedButtonLogin] = useState(false);
  const [recetaBuscada,setRecetaBuscada] = useState('');
  const [recetasGuardadas,setRecetasGuardadas] = useState([]);
  const [topBarWidth,setTopBarWidth] = useState(0);
  const [savedPage,setSavedPage] = useState(false);
  
  const giveLike = (id_receta) => {
    let recetas = [...recetasList];
    let savedRecetas = [...recetasGuardadas];

    const INDEX_ONE = recetas.findIndex(i => i.id === id_receta);
    const INDEX_TWO = savedRecetas.findIndex(i => i.id === id_receta);

    const objeto = {...recetas[INDEX_ONE]};
    if(!savedPage){
      if(INDEX_ONE!==-1 && INDEX_TWO===-1){
        if(objeto.rated){
          objeto.rated = false;
        }else{
          objeto.rated = true;
        }
        if(objeto.rated){
          objeto.rating += 1;
        }else{
          objeto.rating -= 1;
        }
        
        recetas[INDEX_ONE]={...objeto};
        setRecetasList(recetas);
      }else if(INDEX_ONE!==-1 && INDEX_TWO!==-1){
        if(objeto.rated){
          objeto.rated = false;
        }else{
          objeto.rated = true;
        }
        if(objeto.rated){
          objeto.rating += 1;
        }else{
          objeto.rating -= 1;
        }
        
        recetas[INDEX_ONE]={...objeto};
        setRecetasList(recetas);
        savedRecetas[INDEX_TWO] ={...objeto};
        setRecetasGuardadas(savedRecetas);
      }
    }else{
      if(objeto.rated){
        objeto.rated = false;
      }else{
        objeto.rated = true;
      }
      if(objeto.rated){
        objeto.rating += 1;
      }else{
        objeto.rating -= 1;
      }
      
      recetas[INDEX_ONE]={...objeto};
      setRecetasList(recetas);
      savedRecetas[INDEX_TWO] ={...objeto};
      setRecetasGuardadas(savedRecetas);
    }
  };

  const saveReceta = (id_receta) => {
    let recetas = [...recetasList];
    let savedRecetas = [...recetasGuardadas];

    const INDEX_ONE = recetas.findIndex(i => i.id === id_receta);
    const INDEX_TWO = savedRecetas.findIndex(i => i.id === id_receta);

    if(!savedPage){
      if(INDEX_ONE!==-1 && INDEX_TWO===-1){
        recetas[INDEX_ONE].saved = true;
        setRecetasList(recetas);
        setRecetasGuardadas([...recetasGuardadas,recetas[INDEX_ONE]]);
      }else if(INDEX_ONE!==-1 && INDEX_TWO!==-1){
        recetas[INDEX_ONE].saved = false;
        setRecetasList(recetas);
        savedRecetas.splice(INDEX_TWO,1);
        setRecetasGuardadas(savedRecetas);
      }
    }else{
      recetas[INDEX_ONE].saved = false;
      setRecetasList(recetas);
      savedRecetas.splice(INDEX_TWO,1);
      setRecetasGuardadas(savedRecetas);
    }
  };

  const getRecetasListApi = async () => {
    if(recetasList.length===0){
      const {data} = await getRecetasList();
      setRecetasList(data);
    }
  };

  useEffect(() => {
    getRecetasListApi();
  },[pushedButtonLogin]);

  const colorT = ():string => {
    return !themeMode ? "-light" : "-dark";
  };

  const [loading,setLoading] = useState(false);

  const BUTTONS_TWO = [
    {
      text:'like',
      action:(e) => giveLike(e)
    },
    {
      text:'guardar',
      action:(e) => saveReceta(e)
    }
  ];

  return (
    <StoreContext.Provider value={{
      themeMode,
      setThemeMode,
      colorT,
      recetasList,
      setRecetasList,
      pushedButtonLogin,
      setPushedButtonLogin,
      recetaBuscada,
      setRecetaBuscada,
      recetasGuardadas,
      setRecetasGuardadas,
      topBarWidth,
      setTopBarWidth,
      giveLike,
      BUTTONS_TWO,
      savedPage,
      setSavedPage,
      loading,
      setLoading,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(LoginContext)[0];
};
export const useDispatch = () => useContext(LoginContext)[1];
