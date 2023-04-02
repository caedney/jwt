import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const StyledButton = styled(MuiButton)``;

const Button = (props) => {
  const { children, className, ...other } = props;

  return (
    <StyledButton className={clsx('Button-root', className)} {...other}>
      {children}
    </StyledButton>
  );
};

export default Button;
