import { ChangeEvent } from "react";

type prop = {
  classname: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputItem = ({
  classname,
  type,
  placeholder,
  value,
  onChange,
}: prop) => {
  return (
    <div className="w-full">
      <input
        className={classname}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
