import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, LabelInputContainer } from "@/components/ui/label";

const FormInput = () => (
  <LabelInputContainer className="cursor-pointer">
    <Label htmlFor="text-input" className="cursor-pointer">Label</Label>
    <Input id="text-input" placeholder="Text Input" type="text" className={`cursor-pointer`} readOnly/>
  </LabelInputContainer>
);

const SubmitButton = () => <Button className={`cursor-pointer`}>Submit</Button>;

export const components = [
  { name: "text-input", jsx: <FormInput /> },
  { name: "button", jsx: <SubmitButton /> },
];
