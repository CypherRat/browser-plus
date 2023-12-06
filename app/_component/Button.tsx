import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "filled" | "tab";
  icon?: any;
  width?: string;
  height?: string;
  variant?: "success" | "error" | "info" | "warning" | "detail";
  direction?: "row" | "column";
  count?: number;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "filled",
  icon,
  width,
  height,
  variant = "info",
  direction = "row",
  count,
}) => {
  const buttonStyle =
    type === "filled" ? "text-white" : "text-white bg-transparent border";
  const variantStyles = {
    success:
      "bg-green-500 border-green-500 hover:bg-green-700 hover:border-green-700",
    error: "bg-red-500 border-red-500 hover:bg-red-700 hover:border-red-700",
    info: "bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700",
    warning:
      "bg-yellow-500 border-yellow-500 hover:bg-yellow-700 hover:border-yellow-700",
    detail:
      "bg-gray-500 border-gray-500 hover:bg-gray-700 hover:border-gray-700",
  };
  const flexDirection = direction === "row" ? "flex-row" : "flex-col";

  return (
    <button
      onClick={onClick}
      className={`flex ${flexDirection} justify-center items-center gap-x-2 gap-y-2 py-2 px-4 cursor-pointer text-sm font-bold rounded ${variantStyles[variant]} ${buttonStyle} transition-all duration-200`}
      style={{ width: width || "auto", height: height || "auto" }}
    >
      {(icon || count !== undefined) && (
        <div className="flex items-center justify-center gap-2">
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className={direction === "row" ? "text-md" : "text-lg"}
            />
          )}
          {count !== undefined && <span>{count}</span>}
        </div>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
