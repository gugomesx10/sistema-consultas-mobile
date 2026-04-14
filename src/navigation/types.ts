//aqui defini as rotas de navegação do app, cada tela e o que ela recebe
//undefined = a tela não precisa receber nada pra abrir
//ConsultaDetalhes recebe o id da consulta pra saber qual mostrar
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ConsultasList: undefined;
  ConsultaDetalhes: { consultaId: number }; //essa aqui precisa do id
  NovaConsulta: undefined;
  CadastroPaciente: undefined;
  MinhasConsultas: undefined;
};
