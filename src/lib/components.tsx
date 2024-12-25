import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, LabelInputContainer } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Combobox } from "@/components/ui/combo-box";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TextInput = () => (
  <LabelInputContainer className="cursor-pointer">
    <Label htmlFor="text-input" className="cursor-pointer">
      Label
    </Label>
    <Input
      id="text-input"
      placeholder="Text Input"
      type="text"
      className={`cursor-pointer`}
      readOnly
    />
  </LabelInputContainer>
);

const InputOTP1 = () => (
  <LabelInputContainer className="cursor-pointer">
    <Label htmlFor="file-upload" className="cursor-pointer">
      Label
    </Label>
    <InputOTP maxLength={6} className="cursor-pointer">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  </LabelInputContainer>
);

const FileUpload1 = () => (
  <LabelInputContainer className="cursor-pointer">
    <Label htmlFor="file-upload" className="cursor-pointer">
      Label
    </Label>
    <Input id="file-upload" type="file" className={`cursor-pointer`} readOnly />
  </LabelInputContainer>
);

const ComboboxBundle = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <LabelInputContainer className="cursor-pointer">
      <Label htmlFor="file-upload" className="cursor-pointer">
        Label
      </Label>
      <Combobox
        value={value}
        setValue={setValue}
        buttonClassName="cursor-pointer w-48"
      />
    </LabelInputContainer>
  );
};

const RadioInput = () => {
  return (
    <LabelInputContainer className="cursor-pointer">
      <Label htmlFor="file-upload" className="cursor-pointer">
        Label
      </Label>
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Option 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Option 3</Label>
        </div>
      </RadioGroup>
    </LabelInputContainer>
  );
};

const SubmitButton = () => <Button className={`cursor-pointer`}>Submit</Button>;

export const components = [
  { name: "text-input", jsx: <TextInput /> },
  { name: "file-upload", jsx: <FileUpload1 /> },
  { name: "input-otp", jsx: <InputOTP1 /> },
  { name: "combo-box", jsx: <ComboboxBundle /> },
  { name: "radio-input", jsx: <RadioInput /> },
  { name: "button", jsx: <SubmitButton /> },
];
