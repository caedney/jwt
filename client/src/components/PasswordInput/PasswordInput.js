import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiSvgIcon from '@mui/material/SvgIcon';

import IconButton from '../IconButton';
import Input from '../Input';
import Tooltip from '../Tooltip';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const StyledPasswordInput = styled(MuiBox)`
  position: relative;

  .MuiInputBase-root {
    border: 1px solid #ccc;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    width: 100%;

    .MuiInputBase-input {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      padding-right: 50px;
    }
  }

  .MuiIconButton-root {
    position: absolute;
    right: 9px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
`;

const PasswordInput = React.forwardRef(function PasswordInput(props, ref) {
  const { className, color = 'primary', onChange, value, ...other } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((visible) => !visible);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <StyledPasswordInput
      ref={ref}
      className={clsx('PasswordInput-root', className)}
      {...other}
    >
      <Input
        value={value}
        onChange={onChange}
        color={color}
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="Password"
      />
      <Tooltip
        placement="top"
        title={showPassword ? 'Hide password' : 'Show password'}
      >
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          color={color}
        >
          <MuiSvgIcon
            fontSize="small"
            component={showPassword ? VisibilityOffIcon : VisibilityIcon}
          />
        </IconButton>
      </Tooltip>
    </StyledPasswordInput>
  );
});

export default PasswordInput;
