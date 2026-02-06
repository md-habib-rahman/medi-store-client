"use client";

import { addCategory } from "@/actions/action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const Schema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(20, "Title must be less than 200 characters"),
});

export function CreateCategory() {
  const form = useForm({
    defaultValues: {
      title: "",
    },
    validators: {
      onSubmit: Schema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");

      const category = {
        title: value.title,
      };

    //   console.log(category);

      try {
        const res = await addCategory(category);

        // console.log(res);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success("Post Created", { id: toastId });
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a Category</CardTitle>
        <CardDescription>
          Enter category name below and submit to add!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="categories"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Category Title
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Medicine Category"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button form="categories" type="submit" className="w-full cursor-pointer">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
