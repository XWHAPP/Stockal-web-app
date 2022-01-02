import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Sentiment } from '../Models/Sentiment';
import '../css/Card.css';
import '../css/Dashboard.css';
import Results from './Results';

interface Props {}
interface State {
  searchTerm: string | null;
  isLoading: boolean;
  stockSentiment?: Sentiment;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: null, isLoading: false };
  }

  getSearchTerm = (value: string | null) => {
    this.setState({ searchTerm: value, isLoading: true });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Props on SentimentDashboard:' + JSON.stringify(this.props));
    console.log('State on SentimentDashboard:' + JSON.stringify(this.state));

    if (prevState.searchTerm !== this.state.searchTerm) {
      axios
        .get(`/Sentiment`, {
          params: {
            stock: this.state.searchTerm,
          },
        })
        .then((response) => {
          console.log(response);
          const searchResult: Sentiment = { ...response.data };
          this.setState({ stockSentiment: searchResult });
        })
        .catch((error) => {
          console.error(error);
          // TODO: Error-handling with MUI Alert component
          alert('fail: ' + JSON.stringify(error));
          this.setState({ stockSentiment: undefined });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  renderLoader() {
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={this.state.isLoading}>
      <CircularProgress color='inherit' size={100} thickness={5} />
    </Backdrop>;
  }
  renderHeader() {
    return (
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
    );
  }

  renderResults() {
    return <Results searchTerm={this.state.searchTerm} stockSentiment={this.state.stockSentiment}></Results>;
  }

  render() {
    return (
      <div>
        {this.renderLoader()}
        {this.renderHeader()}
        {this.renderResults()}
      </div>
    );
  }
}

export default Dashboard;
