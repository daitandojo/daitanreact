import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, onClick, style }) {
  return (
    <button type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object, // Optional
};

Button.defaultProps = {
  style: {},
};

export default Button;
