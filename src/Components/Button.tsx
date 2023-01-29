import React from 'react';

const Button = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={`rounded-lg px-2 py-1 ring-1 ring-black hover:bg-black hover:text-white transition-all ${
        className ?? ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
