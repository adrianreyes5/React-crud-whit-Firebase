import React from 'react';
import Header from './components/layout/Header';
import ShowUsers from './containers/users/ShowContainer';
import CreateUser from './containers/users/CreateContainer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function App() {
  return (
    <div>
      <Header />
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box>
            <CreateUser />
          </Box>
          <Box display="flex" justifyContent="center">
            <ShowUsers />
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
