import React, { createContext, useContext, useState } from "react";
import { Paciente } from "../types/paciente";
import { Consulta } from "../interfaces/consulta";
import {
  consultasIniciais,
  pacientes as pacientesIniciais,
} from "../data/consultasData";

interface AppContextType {
  pacienteLogado: Paciente | null;
  setPacienteLogado: (p: Paciente | null) => void;
  pacientes: Paciente[];
  adicionarPaciente: (p: Paciente) => void;
  consultas: Consulta[];
  adicionarConsulta: (c: Consulta) => void;
  setConsultas: React.Dispatch<React.SetStateAction<Consulta[]>>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [pacienteLogado, setPacienteLogado] = useState<Paciente | null>(null);
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesIniciais);
  const [consultas, setConsultas] = useState<Consulta[]>(consultasIniciais);

  function adicionarPaciente(p: Paciente) {
    setPacientes((prev) => [...prev, p]);
  }

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

export function useAppContext() {
  return useContext(AppContext);
}
