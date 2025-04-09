import React from 'react';

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  className,
  staggerDelay = 0.1,
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const existingCustom = (child.props as any).custom;
          return React.cloneElement(
            child as React.ReactElement<{ custom?: number }>,
            {
              custom: existingCustom ?? index * staggerDelay,
            }
          );
        }
        return child;
      })}
    </div>
  );
};

export default StaggerGroup;
