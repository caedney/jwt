import * as React from 'react';
import clsx from 'clsx';
import { alpha, css, styled } from '@mui/material/styles';
import MuiInputBase from '@mui/material/InputBase';

const StyledInput = styled(MuiInputBase)(
  ({ theme, color }) => css`
    background: ${theme.palette.common.white};

    .MuiInputBase-input {
      transition-property: box-shadow;
      transition-duration: ${theme.transitions.duration.short}ms;
      transition-timing-function: ${theme.transitions.easing.easeInOut};
      height: 1.5em;
      padding: 12px 16px;

      &::-webkit-input-placeholder {
        opacity: 0.56;
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 4px ${alpha(theme.palette[color].main, 0.25)};
        z-index: 1;
      }
    }
  `
);

const Input = (props) => {
  const { className, color = 'primary', ...other } = props;

  return (
    <StyledInput
      className={clsx('Input-root', className)}
      color={color}
      {...other}
    />
  );
};

export default Input;
