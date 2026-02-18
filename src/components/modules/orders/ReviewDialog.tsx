"use client";
import { postReview } from "@/actions/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { Order } from "@/types/order.typs";

export function ReviewDialog({
  open,
  setOpen,
  order,
  setOrder,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOrder: Dispatch<SetStateAction<string | null>>;
  order: string | null;
}) {
  const [comment, setComment] = useState("");
  //   console.log(order);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log( {review});
    const payload = {
      orderId: order,
      comment,
      status: "PUBLISHED",
    };
    try {
      const result = await postReview(payload);
      console.log(result);
      if (result.success) {
        toast.success("Order review updated!");
      }
    } catch (err: any) {
      toast.error(err.message);
    }

    setOrder(null);
    setComment("");
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your review here and click on 'save'
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="comment">Review</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="write your review"
                onChange={(e) => setComment(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
