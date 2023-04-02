import * as React from 'react';
import clsx from 'clsx';
import { alpha, css, styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const StyledButton = styled(MuiButton)(
  ({ theme, color }) => css`
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 4px ${alpha(theme.palette[color].main, 0.25)};
    }
  `
);

const Button = React.forwardRef(function Button(props, ref) {
  const { children, className, color = 'primary', ...other } = props;

  return (
    <StyledButton
      ref={ref}
      className={clsx('Button-root', className)}
      color={color}
      {...other}
    >
      {children}
    </StyledButton>
  );
});

export default Button;
