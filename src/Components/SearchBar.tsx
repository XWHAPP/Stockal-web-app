import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Props {
  sendSearchTerm(value: string | null): void;
}

interface State {}

class SearchBar extends React.Component<Props, State> {
  handleOpen = (isOpen: boolean) => {
    this.setState({ open: isOpen });
  };

  onAutocompleteChange = (event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    console.log('Searched term = ' + value);
    this.props.sendSearchTerm(value);
  };

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
        onChange={this.onAutocompleteChange}
        sx={{ mr: 2 }}
        selectOnFocus={true}
        blurOnSelect={true}
        clearOnBlur={true}
      />
    );
  }
}

// TODO: True autocomplete data retrieval. See Github issue 1
const autoCompleteOptions = [
  { title: 'BTC', year: 1994 }, // Largely negative stock
  { title: 'ETH', year: 1972 }, // Largely neutral stock
  { title: 'SPY', year: 1974 }, // Largely positive stock / actual stock
  { title: 'TSLA', year: 2018 }, // 404 not found / actual stock
  { title: 'VOO', year: 2018 }, // 404 not found / actual stock
  { title: 'AMD', year: 2018 }, // 404 not found / actual stock
  { title: 'NVDA', year: 2018 }, // 404 not found / actual stock
  { title: 'MATIC', year: 2008 }, // 404 not found
];

export default SearchBar;
