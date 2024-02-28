export enum ButtonType {
  SUBMIT,
  DELETE,
  EDIT,
  CANCEL,
}

export function CustomButton({
  children,
  buttonType,
  type,
  options,
  onClick,
}: {
  children: React.ReactNode;
  buttonType: ButtonType;
  type: "submit" | "reset" | "button" | undefined;
  options?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?: any;
}) {
  let className;
  switch (buttonType) {
    case ButtonType.SUBMIT:
      className = "bg-blue-500 hover:bg-blue-700 text-white";
      break;
    case ButtonType.DELETE:
      className = "bg-red-500 hover:bg-red-700 text-white";
      break;
    case ButtonType.EDIT:
      className = "bg-yellow-500 hover:bg-yellow-700 text-black";
      break;
    case ButtonType.CANCEL:
      className = "bg-gray-500 hover:bg-gray-700 text-white";
      break;
    default:
      className = "bg-blue-500 hover:bg-blue-700 text-white";
  }
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`${className} font-bol rounded px-4 py-2`}
        {...options}
      >
        {children}
      </button>
    </>
  );
}
