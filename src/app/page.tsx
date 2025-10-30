import { Button } from "../components/ui/button";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";

export default function Home() {
  return (
    <div className="grid gap-2 md:grid-cols-12 p-4">
      <div className="col-span-11">
        <Field>
          <FieldLabel htmlFor="input-id">Describe Persons</FieldLabel>
          <Input type="text" placeholder="Search for users..." />
        </Field>
      </div>
      <div className="flex col-span-1 justify-center items-end">
        <Button>Hello World!</Button>
      </div>
    </div>
  );
}
