type prop = {
  label: string;
  buttomClick: () => void;
  className: string;
};

export const ButtomItem = ({ label, buttomClick, className }: prop) => {
  return (
    <div className={className} onClick={buttomClick}>
      {label}
    </div>
  );
};
