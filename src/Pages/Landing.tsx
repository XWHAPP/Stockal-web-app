import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from '../Components/SearchBar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { PublicSentiment } from '../Models/PublicSentiment';

interface Props {}
interface State {
  searchTerm: string | null;
  isLoading: boolean;
  stockSentiment?: PublicSentiment;
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

    if (prevState.searchTerm !== this.state.searchTerm) {
      axios
        .get(`/Sentiment`, {
          params: {
            stock: this.state.searchTerm,
          },
        })
        .then((response) => {
          console.log(response);
          const searchResult: PublicSentiment = { ...response.data };
          this.setState({ stockSentiment: searchResult });
        })
        .catch((error) => {
          console.error(error);
          alert('fail: ' + JSON.stringify(error));
          this.setState({ stockSentiment: undefined });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <div>
        {/* Loader backdrop */}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={this.state.isLoading}>
          <CircularProgress color='inherit' size={100} thickness={5} />
        </Backdrop>
        {/* //// */}

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

        {/* Body */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: 'primary.dark',
          }}
        >
          {/* TODO: Beautify this */}
          <h2>{this.state.searchTerm}</h2>
          <p>Postivity: {this.state.stockSentiment?.positivity}</p>
          <p>Neutrality: {this.state.stockSentiment?.neutrality}</p>
          <p>Negativity: {this.state.stockSentiment?.negativity}</p>
        </Box>
        {/* //// */}
      </div>
    );
  }
}

export default Landing;
