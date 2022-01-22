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
import { SentimentResults } from '../Models/SentimentResults';
import '../css/Card.css';
import '../css/Dashboard.css';
import Results from './Results';
import { getSentimentalResults } from '../Apis/SearchApi';
import { Alert, Snackbar } from '@mui/material';

interface Props {}
interface State {
  searchTerm?: string;
  isLoading: boolean;
  stockSentiment?: SentimentResults;
  errorMessage?: string;
  showSnackBar: boolean;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isLoading: false, showSnackBar: false };
  }

  getSearchTerm = (value: string) => {
    this.setState({ searchTerm: value, isLoading: true });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Props on SentimentDashboard:' + JSON.stringify(this.props));
    console.log('State on SentimentDashboard:' + JSON.stringify(this.state));

    if (prevState.searchTerm !== this.state.searchTerm && this.state.searchTerm) {
      getSentimentalResults(this.state.searchTerm)
        .then((searchResult) => {
          this.setState({ stockSentiment: searchResult, isLoading: false });
        })
        .catch((error) => {
          this.setState({ stockSentiment: undefined, isLoading: false, showSnackBar: true, errorMessage: error });
        });
    }
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

  // TODO: Componentize snackbar
  renderSnackBar() {
    return (
      <Snackbar
        open={this.state.showSnackBar}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          this.setState({ showSnackBar: false, errorMessage: undefined });
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={5000}
      >
        <Alert severity='error' sx={{ width: '100%' }}>
          {this.state.errorMessage ? this.state.errorMessage : 'Unexpected error encountered, please try again!'}
        </Alert>
      </Snackbar>
    );
  }

  render() {
    return (
      <div>
        {/* Loader backdrop */}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={this.state.isLoading}>
          <CircularProgress color='inherit' size={100} thickness={5} />
        </Backdrop>
        {/* //// */}

        {this.renderHeader()}

        {this.renderResults()}

        {this.state.showSnackBar && this.renderSnackBar()}
      </div>
    );
  }
}

export default Dashboard;
