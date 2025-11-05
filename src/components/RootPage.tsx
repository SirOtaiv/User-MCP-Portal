"use client"

import { useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { ModuleRegistry, AllCommunityModule, themeQuartz, colorSchemeDarkBlue } from "ag-grid-community";
import { type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { SearchIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { Spinner } from "./ui/spinner";
import { getPersonsPerfils } from "../lib/requests";
import axios from "axios";

ModuleRegistry.registerModules([AllCommunityModule]);

type personSearchFormType = {
   searchParam: string;
}

export type PersonsMCPTableRow = {
   name: string;
   url: string;
   title: string;
   score: number;
   reason: string;
}
const transformedDataWithScore: PersonsMCPTableRow[] = [
   { name: "Ana Silva", url: "", title: "Engenheira de Software", score: 8, reason: "Alta demanda e salários competitivos na área de TI." },
   { name: "Bruno Costa", url: "", title: "Designer Gráfico", score: 4, reason: "Salário médio, com grande variação por tipo de projeto/empresa." },
   { name: "Carla Mendes", url: "", title: "Analista de Marketing", score: 6, reason: "Bom potencial de crescimento, especialmente no marketing digital." },
   { name: "Diego Rocha", url: "", title: "Gerente de Projetos", score: 9, reason: "Cargo de gestão com alta responsabilidade e remuneração." },
   { name: "Eduarda Lima", url: "", title: "Arquiteta", score: 6, reason: "Salário médio/bom, dependendo da experiência e projetos próprios." },
   { name: "Fábio Santos", url: "", title: "Desenvolvedor Front-End", score: 7, reason: "Sólida demanda em TI, com salários crescentes." },
   { name: "Gabriela Nunes", url: "", title: "Cientista de Dados", score: 9, reason: "Ocupação de ponta em TI com remuneração alta e escassa no mercado." },
   { name: "Henrique Almeida", url: "", title: "Administrador de Redes", score: 5, reason: "Função essencial em TI, mas com remuneração que varia muito por nível." },
   { name: "Isabela Ramos", url: "", title: "Produtora de Conteúdo", score: 5, reason: "Grande variação de remuneração, dependendo da plataforma e alcance." },
   { name: "João Pedro", url: "", title: "Contador", score: 7, reason: "Profissão regulamentada e estável, com bom potencial para senioridade." },
   { name: "Karla Souza", url: "", title: "Engenheira Civil", score: 6, reason: "Salário que depende do setor (público/privado) e escopo da obra." },
   { name: "Lucas Martins", url: "", title: "Técnico em Informática", score: 4, reason: "Nível técnico, geralmente com salários de entrada." },
   { name: "Mariana Oliveira", url: "", title: "Professora", score: 5, reason: "Remuneração variável por nível de ensino e rede (pública/privada)." },
   { name: "Natália Gomes", url: "", title: "Assistente Administrativa", score: 3, reason: "Cargo de suporte com salários tipicamente mais baixos." },
   { name: "Otávio Barros", url: "", title: "Diretor Financeiro", score: 10, reason: "Cargo de alto escalão com um dos maiores salários no mercado." },
   { name: "Patrícia Ferreira", url: "", title: "Médica", score: 9, reason: "Profissão de alto prestígio e remuneração, especialmente com especialização." },
   { name: "Rafael Teixeira", url: "", title: "Desenvolvedor Back-End", score: 8, reason: "Alta demanda e salários competitivos, essencial para sistemas." },
   { name: "Sofia Dias", url: "", title: "Estagiária de RH", score: 2, reason: "Posição de entrada com bolsa auxílio." },
   { name: "Tiago Ribeiro", url: "", title: "Consultor de Negócios", score: 8, reason: "Potencial de altos ganhos, dependendo do portfólio de clientes e resultados." },
   { name: "Vanessa Carvalho", url: "", title: "Artesã", score: 3, reason: "Grande dependência do volume de vendas e nicho de mercado." },
];

export default function RootPage() {

   const { control, handleSubmit } = useForm<personSearchFormType>({
      mode: "onBlur"
   })

   const [rowData, setRowData] = useState<PersonsMCPTableRow[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   const handleOnSearchSubmit = async (data: personSearchFormType) => {
      setLoading(true);
      // await new Promise(r => setTimeout(r, 5000))
      try {
         const dataResponse = await getPersonsPerfils(data.searchParam);
         if (dataResponse) {
            setRowData(dataResponse.rows)
         }
      } catch (err) {
         console.error("Erro no submit da busca:", err);
         let errorMessage = "Ocorreu um erro desconhecido ao processar a busca.";

         if (axios.isAxiosError(err) && err.response) {
               errorMessage = err.response.data.message || `Erro do servidor: ${err.response.status}`;
         } else if (err instanceof Error) {
               errorMessage = err.message;
         }
         alert(errorMessage)
      } finally {
         setLoading(false)
      }
   }

   const colDefs = useMemo<ColDef<PersonsMCPTableRow>[]>(() => [
      {
         field: "name",
         headerName: "Nome",
         width: 250,
         
      },
      {
         field: "score",
         headerName: "Pontuação",
         width: 100,
      },
      {
         field: "title",
         headerName: "Título",
         width: 250
      },
      {
         field: "reason",
         headerName: "Explicação",
         flex: 1
      }
   ], [])

   const buttonContent = () => {
      if (loading) {
         return (<><Spinner className="size-6" />Searching...</>)
      }
      return (<><SearchIcon />Search</>)
   }

   return (
      <div className="flex flex-col h-full min-h-0 p-4 gap-8">
         <div>
            <form className="flex gap-4" onSubmit={handleSubmit(handleOnSearchSubmit)}>
               <div className="flex-1">
                  <Controller
                     control={control}
                     name="searchParam"
                     rules={{
                        required: "Field is Required"
                     }}
                     render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.error && true}>
                           <FieldLabel>Describe Persons</FieldLabel>
                           <Textarea
                              {...field}
                              placeholder="Search for users..."
                              disabled={loading}
                              aria-invalid={fieldState.error && true}
                           />
                           {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                     )}
                  />
               </div>
               <div className="flex items-center">
                  <Button type="submit" className="w-30" disabled={loading}>{buttonContent()}</Button>
               </div>
            </form>
         </div>
         <div className="flex-1 min-h-0">
            <AgGridReact
               theme={themeQuartz.withPart(colorSchemeDarkBlue)}
               rowData={rowData}
               columnDefs={colDefs}
               domLayout="normal"
            />
         </div>
      </div>
   );
}