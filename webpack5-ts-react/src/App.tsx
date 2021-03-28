import './app.css';

import styled from '@emotion/styled';
import React from 'react';

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return <StyledWrapper>123213123213</StyledWrapper>;
};

const StyledWrapper = styled.div`
  background: cadetblue;
`;

export default App;
