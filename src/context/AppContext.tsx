import React, { createContext, useContext, useState } from "react";
import { Paciente } from "../types/paciente";
import { Consulta } from "../interfaces/consulta";
import {
  consultasIniciais,
  pacientes as pacientesIniciais,
} from "../data/consultasData";

//aqui eu criei o contexto global do app
//isso serve pra compartilhar dados entre todas as telas sem precisar ficar passando props

//essa interface define tudo que o contexto oferece
interface AppContextType {
  pacienteLogado: Paciente | null; //quem tá logado no momento
  setPacienteLogado: (p: Paciente | null) => void;
  pacientes: Paciente[]; //lista de todos os pacientes
  adicionarPaciente: (p: Paciente) => void; //função pra cadastrar paciente novo
  consultas: Consulta[]; //lista de todas as consultas
  adicionarConsulta: (c: Consulta) => void; //função pra criar consulta nova
  setConsultas: React.Dispatch<React.SetStateAction<Consulta[]>>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

//aqui é o Provider que envolve o app inteiro, ele guarda os estados globais
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [pacienteLogado, setPacienteLogado] = useState<Paciente | null>(null); //começa sem ninguém logado
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesIniciais); //carrega os pacientes iniciais
  const [consultas, setConsultas] = useState<Consulta[]>(consultasIniciais); //carrega as consultas iniciais

  //essa função adiciona um paciente novo na lista
  function adicionarPaciente(p: Paciente) {
    setPacientes((prev) => [...prev, p]);
  }

  //essa função adiciona uma consulta nova na lista
  function adicionarConsulta(c: Consulta) {
    setConsultas((prev) => [...prev, c]);
  }

  return (
    <AppContext.Provider
      value={{
        pacienteLogado,
        setPacienteLogado,
        pacientes,
        adicionarPaciente,
        consultas,
        adicionarConsulta,
        setConsultas,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

//esse hook facilita pra usar o contexto em qualquer tela, só chamar useAppContext()
export function useAppContext() {
  return useContext(AppContext);
}
