"use client"

import { useMemo } from "react";
import { Button } from "../components/ui/button";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// import { useTheme } from "next-themes";

ModuleRegistry.registerModules([AllCommunityModule]);

export type PersonsMCPTableRow = {
  name: string;
  age: number;
  occupation: string;
}

type PropsType = {
  rowData: PersonsMCPTableRow[]
}

export default function RootPage({ rowData }: PropsType) {
  // const { theme } = useTheme()

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

  return (
    <div className="flex flex-col h-full min-h-0 p-4 gap-8">
      <div className="flex gap-2">
        <div className="flex-1">
          <Field>
            <FieldLabel htmlFor="input-id">Describe Persons</FieldLabel>
            <Input type="text" placeholder="Search for users..." />
          </Field>
        </div>
        <div className="flex items-end">
          <Button>Hello World!</Button>
        </div>
      </div>
      <div className="ag-theme-quartz flex-1 min-h-0">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          domLayout="normal"
        />
      </div>
    </div>
  );
}