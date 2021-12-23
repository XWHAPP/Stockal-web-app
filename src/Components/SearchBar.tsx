import * as React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Props {}

interface State {
  searchTerm: String | null;
  // TODO: tell Dashboard that it needs to display loading screen or not (tru props?)
  isLoading: boolean;
}

class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: null, isLoading: false };
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
  }

  onSearchValueChange = (event: React.SyntheticEvent<Element, Event>, value: String | null) => {
    console.log('Searched term = ' + value);
    this.setState({ searchTerm: value, isLoading: true });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Props:' + JSON.stringify(this.props));
    console.log('State:' + JSON.stringify(this.state));

    if (this.state.isLoading) {
      // TODO: Tell ownself OR others to load loading screen
    } else {
      // TODO: Tell ownself OR others to unload loading screen
    }

    if (prevState.searchTerm !== this.state.searchTerm) {
      axios
        .post(`http://stockal.mocklab.io/v1/Sentiment`, {
          stock: this.state.searchTerm,
        })
        .then((response) => {
          // TODO: tear down loading screen, and pass response to Dashboard to display shitz with
          this.setState({ isLoading: false });
          console.log(response);
        })
        .catch(function (error) {
          // TODO: tear down loading screen, and pass error to Dashboard to display error with
          console.error(error);
        });
    }
  }

  render() {
    return (
      <Autocomplete
        id='SearchBar'
        freeSolo
        fullWidth
        autoHighlight
        size='small'
        options={autoCompleteOptions.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label='Search stocks' />}
        onChange={this.onSearchValueChange}
      />
    );
  }
}

// TODO: True autocomplete data retrieval. See Github issue 1
const autoCompleteOptions = [
  { title: 'BTC', year: 1994 }, // Largely negative stock
  { title: 'ETH', year: 1972 }, // Largely neutral stock
  { title: 'SPY', year: 1974 }, // Largely positive stock
  { title: 'MATIC', year: 2008 }, // 404 not found
];

export default SearchBar;
