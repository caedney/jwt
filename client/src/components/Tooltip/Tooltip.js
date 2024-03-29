import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import MuiTooltip from '@mui/material/Tooltip';

const StyledTooltip = styled(({ className, ...props }) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))`
  &[data-popper-placement*='top'] .MuiTooltip-tooltip {
    margin-bottom: 10px;
  }
`;

const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const { children, className, ...other } = props;

  return (
    <StyledTooltip
      ref={ref}
      className={clsx('Tooltip-root', className)}
      arrow={false}
      enterDelay={100}
      leaveDelay={100}
      {...other}
    >
      {children}
    </StyledTooltip>
  );
});

export default Tooltip;
