import * as React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Props {
}

interface State {
  searchTerm: String | null,
}

class SearchBar extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: null };
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
  }
  
  onSearchValueChange = (event: React.SyntheticEvent<Element, Event>, value: String | null) => {
    console.log("Searched term = " + value);
    
    this.setState({ searchTerm: value });
  }

  componentDidUpdate() {
    console.log("Props:" + JSON.stringify(this.props));
    console.log("State:" + JSON.stringify(this.state));

    axios.get(`http://stockal.mocklab.io/v1/senti`, {
      params: {stock: this.state.searchTerm},
    });
  }

  render() {
    return (
      <Autocomplete
        id="SearchBar"
        freeSolo
        fullWidth
        autoHighlight
        size = 'small'
        options={autoCompleteOptions.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="Search stocks" />}
        onChange={this.onSearchValueChange}
    />
    );
  }
}

// TODO: True autocomplete data retrieval. See Github issue 1
const autoCompleteOptions = [
  { title: 'Bitcoin', year: 1994 }, // Largely negative stock
  { title: 'Ethereum', year: 1972 }, // Largely neutral stock
  { title: 'Polygon', year: 1974 }, // Largely positive stock
  { title: 'Shiba', year: 2008 }, // 404 not found
  { title: 'Dogecoin', year: 1957 },
];

export default SearchBar;