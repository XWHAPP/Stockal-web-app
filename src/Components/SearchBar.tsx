import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Props {

}

interface State {
  searchTerm: String | null
}

class SearchBar extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: null };
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
  }
  
  onSearchValueChange = (event: React.SyntheticEvent<Element, Event>, value: String | null) => {
    // console.log(event.currentTarget);
    console.log("Searched term = " + value);
    
    this.setState({ searchTerm: value });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log("prevProps:" + JSON.stringify(prevProps));
    console.log("prevState:" + JSON.stringify(prevState));
    console.log("Props:" + JSON.stringify(this.props));
    console.log("State:" + JSON.stringify(this.state));
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

// TODO: True autocomplete data retrieval
const autoCompleteOptions = [
  { title: 'Bitcoin', year: 1994 },
  { title: 'Ethereum', year: 1972 },
  { title: 'Polygon', year: 1974 },
  { title: 'Shiba', year: 2008 },
  { title: 'Dogecoin', year: 1957 },
];

export default SearchBar;