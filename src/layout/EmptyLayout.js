import Content from './Content';
import React from 'react';

const EmptyLayout = ({ children, ...restProps }) => (

  <main className="cr-app bg-light" {...restProps}>
    <Content fluid onClick={restProps.handleContentClick}>
      {children}
    </Content>
  </main>

);

export default EmptyLayout;
