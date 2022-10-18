import { ThemeProvider } from '@theme-ui/core';
import { theme } from 'theme/theme';

import { Container } from './Container/Container';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container display="flex" flexDirection="column" alignItems="center" padding="3">
     <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      React homework template
    </div>
      </Container>
      </ThemeProvider>

  );
};
