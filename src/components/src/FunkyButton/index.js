import React from 'react';
import { StyledFunkyButton } from './styles';

const FunkyButton = ({ onClick, children }) => {
  return (
    <StyledFunkyButton onClick={onClick}>
      {children}
    </StyledFunkyButton>
  );
};

export default FunkyButton;
