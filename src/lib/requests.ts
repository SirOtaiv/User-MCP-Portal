"use server"

import axios from "axios";
import { mcpServerApiUrl } from "./config";

export async function getPersonsPerfils(param: string) {
   try {
      const { data } = await axios.post(`${mcpServerApiUrl}/gemini/`, {
         prompt: param,
      }, {
         headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
         }
      })

      const safeData = JSON.parse(JSON.stringify(data));

      return safeData;
   } catch (error) {
      console.error("Erro ao buscar perfis:", error);
      throw error;
   }
}