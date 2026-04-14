//aqui defini os status que uma consulta pode ter
//usei union type do TypeScript, só aceita esses 4 valores
export type StatusConsulta =
  | "agendada"
  | "confirmada"
  | "cancelada"
  | "realizada";