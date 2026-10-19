import React from 'react';

function Text({ variant = 'p', children, className = '', style = {} }) {
  const Component = variant;

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
}

export default Text;