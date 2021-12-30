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
import { Sentiment } from '../Models/Sentiment';
import { VictoryLabel, VictoryPie } from 'victory';
import { Paper } from '@mui/material';

interface Props {}
interface State {
  searchTerm: string | null;
  isLoading: boolean;
  stockSentiment?: Sentiment;
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

  renderSentiment() {
    if (this.state.stockSentiment) {
      return (
        <div>
          <VictoryPie
            // TODO: Add localisation and store texts in en.json
            data={[
              { x: 'Positivity', y: this.state.stockSentiment?.positivity },
              { x: 'Neutrality', y: this.state.stockSentiment?.neutrality },
              { x: 'Negativity', y: this.state.stockSentiment?.negativity },
            ]}
            labels={({ datum }) => `${datum.x}: ${Math.round((datum.y + Number.EPSILON) * 1000) / 1000}`}
            colorScale={['#47B39C', '#FFC154', '#EC6B56']}
            height={200}
            labelComponent={<VictoryLabel style={[{ fontSize: 6 }]} textAnchor={'middle'} />}
          />
        </div>
      );
    } else return <></>;
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
          }}
        >
          {/* TODO: Beautify this */}
          <h2>{this.state.searchTerm}</h2>
          <Box sx={{ flexGrow: 1 }}>
            <Paper elevation={1}>
              <p>Positivity: {this.state.stockSentiment?.positivity}</p>
            </Paper>
            <Paper elevation={1}>
              <p>Neutrality: {this.state.stockSentiment?.neutrality}</p>
            </Paper>
            <Paper elevation={1}>
              <p>Negativity: {this.state.stockSentiment?.negativity}</p>
            </Paper>
          </Box>
          {this.renderSentiment()}
        </Box>
        {/* //// */}
      </div>
    );
  }
}

export default Landing;
