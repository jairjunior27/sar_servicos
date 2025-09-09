type prop = {
  label: string;
  onClick?: () => void;
  className: string;
};

export const ButtomItem = ({ label, onClick, className }: prop) => {
  return (
    <div className={className} onClick={onClick}>
      {label}
    </div>
  );
};
