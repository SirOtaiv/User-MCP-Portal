import RootPage, { PersonsMCPTableRow } from "../components/RootPage";

export default function Home() {

  const rowData: PersonsMCPTableRow[] = [
    { name: "Ana Silva", age: 28, occupation: "Engenheira de Software" },
    { name: "Bruno Costa", age: 34, occupation: "Designer Gráfico" },
    { name: "Carla Mendes", age: 25, occupation: "Analista de Marketing" },
    { name: "Diego Rocha", age: 41, occupation: "Gerente de Projetos" },
    { name: "Eduarda Lima", age: 30, occupation: "Arquiteta" },
    { name: "Fábio Santos", age: 27, occupation: "Desenvolvedor Front-End" },
    { name: "Gabriela Nunes", age: 33, occupation: "Cientista de Dados" },
    { name: "Henrique Almeida", age: 38, occupation: "Administrador de Redes" },
    { name: "Isabela Ramos", age: 29, occupation: "Produtora de Conteúdo" },
    { name: "João Pedro", age: 35, occupation: "Contador" },
    { name: "Karla Souza", age: 32, occupation: "Engenheira Civil" },
    { name: "Lucas Martins", age: 26, occupation: "Técnico em Informática" },
    { name: "Mariana Oliveira", age: 31, occupation: "Professora" },
    { name: "Natália Gomes", age: 24, occupation: "Assistente Administrativa" },
    { name: "Otávio Barros", age: 40, occupation: "Diretor Financeiro" },
    { name: "Patrícia Ferreira", age: 36, occupation: "Médica" },
    { name: "Rafael Teixeira", age: 28, occupation: "Desenvolvedor Back-End" },
    { name: "Sofia Dias", age: 23, occupation: "Estagiária de RH" },
    { name: "Tiago Ribeiro", age: 39, occupation: "Consultor de Negócios" },
    { name: "Vanessa Carvalho", age: 27, occupation: "Artesã" },
  ];

  return (
    <RootPage rowData={rowData} />
  )
}
