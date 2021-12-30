import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from '../Components/SearchBar';

interface Props {}

interface State {}

class Landing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Props:' + JSON.stringify(this.props));
    console.log('State:' + JSON.stringify(this.state));
  }

  render() {
    return (
      <div>
        {/* Header */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='sticky'>
            <Toolbar>
              <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant='h4' component='div' sx={{ flexGrow: 1, mr: 2 }}>
                Stockal
              </Typography>
              <SearchBar></SearchBar>
              <Button color='inherit'>Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        {/* //// */}
      </div>
    );
  }
}

export default Landing;
