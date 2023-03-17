import './styles.css';

import { PropsWithChildren } from 'react';

export const Page: React.FC<PropsWithChildren & { title: string }> = ({ children, title }) => {
  return (
    <div className="Page">
      <p>{title}</p>
      {children}
    </div>
  );
};
