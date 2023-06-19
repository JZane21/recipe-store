import { UserInterface } from "../models/UserInterface";
import { crmAPI } from "./crmInstance";

export const addUser = async (user: UserInterface) => {
  return await crmAPI.post("/users", user);
};

export const getUserByEmail = async (email: string) => {
  const data = (await crmAPI.get(`/users/${email}`)
  .then((response) => {return response})
  .catch((error) => {return null}));
  return data;
};

export const getRecetasList =async () => {
  return await crmAPI.get('/recetas');
}
