import axios from 'axios';
import { push } from 'connected-react-router';
import { routes } from '../containers/Router'

const baseURL = "https://us-central1-missao-newton.cloudfunctions.net/fourEddit"

// Cria um novo usuário e enviar para a página de Feeds.

export const createUser = (email, password, username) => async (dispatch) => {
   const newUser = {
      email,
      password,
      username,
   }

   try {
      const response = await axios.post(`${baseURL}/signup`, newUser)
      window.localStorage.setItem("token", response.data.token)

      dispatch(push(routes.feed))

   } catch (error) {
      window.alert("Erro ao criar usuário!")
   }
}