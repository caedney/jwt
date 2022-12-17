import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiIconButton from '@mui/material/IconButton';
import MuiInputBase from '@mui/material/InputBase';
import MuiSvgIcon from '@mui/material/SvgIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const StyledPasswordInput = styled(MuiBox)`
  &.PasswordInput-root {
    position: relative;

    .PasswordInput-input {
      border: 1px solid #ccc;
      border-top: none;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      width: 100%;

      .MuiInputBase-input {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding-right: 50px;
      }
    }

    .MuiIconButton-root {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const PasswordInput = (props) => {
  const { className, onChange, value, ...other } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((visible) => !visible);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <StyledPasswordInput className="PasswordInput-root" {...other}>
      <MuiInputBase
        className="PasswordInput-input"
        value={value}
        onChange={onChange}
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="Password"
      />
      <MuiIconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        color="primary"
      >
        <MuiSvgIcon
          fontSize="small"
          component={showPassword ? VisibilityOffIcon : VisibilityIcon}
        />
      </MuiIconButton>
    </StyledPasswordInput>
  );
};

export default PasswordInput;
