import { Button } from '@mui/material';
import * as React from 'react';

interface Props {}

interface State {}

class Landing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: null, isLoading: false };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Props:' + JSON.stringify(this.props));
    console.log('State:' + JSON.stringify(this.state));
  }

  render() {
    return <Button variant='contained'>Hello World</Button>;
  }
}

export default Landing;
