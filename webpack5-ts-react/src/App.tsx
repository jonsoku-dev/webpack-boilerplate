import './app.css';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <StyledWrapper>
      <span
        css={css`
          color: white;
        `}
      >
        test
      </span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: cadetblue;
`;

export default App;
