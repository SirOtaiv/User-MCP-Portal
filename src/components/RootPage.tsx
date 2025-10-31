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

ModuleRegistry.registerModules([AllCommunityModule]);

type personSearchFormType = {
   searchParam: string;
}

export type PersonsMCPTableRow = {
   name: string;
   age: number;
   occupation: string;
}

type PropsType = {
   rowData: PersonsMCPTableRow[]
}

export default function RootPage({ rowData }: PropsType) {

   const { control, handleSubmit } = useForm<personSearchFormType>({
      mode: "onBlur"
   })

   const [loading, setLoading] = useState<boolean>(false);

   const handleOnSearchSubmit = async (data: personSearchFormType) => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 5000));
      console.log(data.searchParam)
      setLoading(false)
   }

   const colDefs = useMemo<ColDef<PersonsMCPTableRow>[]>(() => [
      {
         field: "name",
         headerName: "Nome",
      },
      {
         field: "age",
         headerName: "Idade",
      },
      {
         field: "occupation",
         headerName: "Descrição",
      }
   ], [])

   const defaultColDef: ColDef = {
      flex: 1,
   };

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
               defaultColDef={defaultColDef}
            />
         </div>
      </div>
   );
}