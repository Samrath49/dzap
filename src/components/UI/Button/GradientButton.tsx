import React, { ReactNode } from "react";

type GradientButtonTypes = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  hidden: boolean;
};

const GradientButton: React.FC<GradientButtonTypes> = ({
  children,
  disabled = false,
  onClick,
  hidden = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      hidden={hidden}
      className={`mf:flex flex text-center justify-center px-3 py-4 rounded-3xl font-medium text-gray-100 ${
        hidden && `hidden`
      } ${
        disabled
          ? "cursor-not-allowed bg-richBlack"
          : "cursor-pointer gradient-btn"
      }`}
    >
      {children}
    </button>
  );
};

export default GradientButton;
