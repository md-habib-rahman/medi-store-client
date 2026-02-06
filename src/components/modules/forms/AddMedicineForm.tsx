import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const AddMedicineForm = () => {

	

  const addMedicine = async (formData: FormData) => {
    "use server";
    console.log(formData.get("title"));
  };

  return (
    <Card className="w-4xl mx-auto p-4">
      <CardTitle>Add Medicine</CardTitle>
      <CardDescription>Add Your Medicine</CardDescription>
      <CardContent>
        <form id="medicine-form" action={addMedicine}>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input type="text" name="title"></Input>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="medicine-form" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};
