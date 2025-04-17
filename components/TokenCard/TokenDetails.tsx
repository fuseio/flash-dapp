import { ReactNode } from 'react';

interface TokenDetailsProps {
  children: ReactNode;
}

const TokenDetails = ({ children }: TokenDetailsProps) => {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <article className="flex flex-col bg-card border rounded-twice">
      {childrenArray.map((child, index) => (
        <div key={index}>
          {child}
          {index < childrenArray.length - 1 && (
            <div className="border-b" />
          )}
        </div>
      ))}
    </article>
  );
};

export default TokenDetails;
