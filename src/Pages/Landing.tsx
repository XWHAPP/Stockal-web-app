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
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';

interface Props {}
interface State {
  searchTerm: string | null;
  isLoading: boolean;
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
    } else {
    }

    if (prevState.searchTerm !== this.state.searchTerm) {
      axios
        .get(`/Sentiment`, {
          params: {
            stock: this.state.searchTerm,
          },
        })
        .then((response) => {
          console.log(response);
          alert('success: ' + JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error(error);
          alert('fail: ' + JSON.stringify(error));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <div>
        {/* Loading overlay */}
        <div className='sweet-loading'>
          <ClipLoader css={override} size={100} color={'#123abc'} loading={this.state.isLoading} speedMultiplier={1} />
        </div>
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
      </div>
    );
  }
}

export default Landing;
