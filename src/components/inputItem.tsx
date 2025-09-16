import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";

type prop = {
  className: string;
  type?: string;
  password?: boolean;
  value?: string | number;
  checked?: boolean;
  placeholder?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  icon?: IconDefinition;
  clickIcon?: () => void;
};

export const InputItem = ({
  className,
  type,
  password,
  value,
  onChange,
  placeholder,
  icon,
  checked,
  clickIcon,
}: prop) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <input
        value={value}
        onChange={onChange}
        checked={checked}
        type={password ? (showPassword ? "text" : "password") : type}
        autoComplete="off"
        placeholder={placeholder}
        className="w-full outline-0 px-2 bg-transparent"
      />
      {icon && <FontAwesomeIcon icon={icon} onClick={clickIcon} />}
      {password && (
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="mr-2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
};
