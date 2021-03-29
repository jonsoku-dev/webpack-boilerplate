import { css } from '@emotion/react';
import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      css={css`
        color: #7c7171;
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
