import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from '../Components/SearchBar';
import axios from 'axios';

interface Props {}
interface State {
  searchTerm: string | null;
  // TODO: tell Dashboard that it needs to display loading screen or not (tru props?)
  isLoading: boolean;
}

class Landing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: null, isLoading: false };
  }

  getSearchTerm = (value: string | null) => {
    this.setState({ searchTerm: value, isLoading: true });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Props on Landing:' + JSON.stringify(this.props));
    console.log('State on Landing:' + JSON.stringify(this.state));

    if (this.state.isLoading) {
      // TODO: Tell ownself OR others to load loading screen
    } else {
      // TODO: Tell ownself OR others to unload loading screen
    }

    if (prevState.searchTerm !== this.state.searchTerm) {
      axios
        .get(`/Sentiment`, {
          params: {
            stock: this.state.searchTerm,
          },
        })
        .then((response) => {
          // TODO: tear down loading screen, and pass response to Dashboard to display shitz with
          this.setState({ isLoading: false });
          console.log(response);
          alert(JSON.stringify(response.data));
        })
        .catch(function (error) {
          // TODO: tear down loading screen, and pass error to Dashboard to display error with
          console.error(error);
          alert(JSON.stringify(error));
        });
    }
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
              <SearchBar sendSearchTerm={this.getSearchTerm}></SearchBar>
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
