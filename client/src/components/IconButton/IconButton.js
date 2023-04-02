import * as React from 'react';
import clsx from 'clsx';
import { alpha, css, styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';

const StyledIconButton = styled(MuiIconButton)(
  ({ theme, color }) => css`
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 4px ${alpha(theme.palette[color].main, 0.25)};
    }
  `
);

const IconButton = (props) => {
  const { children, className, color = 'primary', ...other } = props;

  return (
    <StyledIconButton
      className={clsx('IconButton-root', className)}
      color={color}
      {...other}
    >
      {children}
    </StyledIconButton>
  );
};

export default IconButton;
