import * as React from 'react';

interface Props {}

interface State {}

class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Props:' + JSON.stringify(this.props));
    console.log('State:' + JSON.stringify(this.state));
  }

  render() {
    return <></>;
  }
}

export default SearchBar;
