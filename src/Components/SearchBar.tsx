import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { StockSearchOptions } from '../Models/StockSearchOptions';
import { Box, createFilterOptions } from '@mui/material';

interface Props {
  sendSearchTerm(value: string | null): void;
  autocompleteOptions: Array<StockSearchOptions>;
}

interface State {}

class SearchBar extends React.Component<Props, State> {
  handleOpen = (isOpen: boolean) => {
    this.setState({ open: isOpen });
  };

  onAutocompleteChange = (event: React.SyntheticEvent<Element, Event>, value: any | null) => {
    console.log('Searched term = ' + value?.symbol);
    if (value) {
      this.props.sendSearchTerm(value?.symbol);
    }
  };

  render() {
    return (
      <Autocomplete
        id='SearchBar'
        freeSolo
        fullWidth
        autoHighlight
        size='small'
        options={this.props.autocompleteOptions}
        getOptionLabel={(option) => option.symbol}
        renderInput={(params) => <TextField {...params} label='Search stocks' />}
        onChange={this.onAutocompleteChange}
        renderOption={(props, option) => (
          <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.symbol} ({option.name})
          </Box>
        )}
        filterOptions={createFilterOptions({ limit: 10 })}
        sx={{ mr: 2 }}
        selectOnFocus={true}
        blurOnSelect={true}
        clearOnBlur={true}
      />
    );
  }
}

export default SearchBar;
