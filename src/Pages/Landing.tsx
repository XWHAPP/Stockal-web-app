import * as React from 'react';
import HeaderBar from '../Components/HeaderBar';

interface Props {}

interface State {}

class Landing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Props:' + JSON.stringify(this.props));
    console.log('State:' + JSON.stringify(this.state));
  }

  render() {
    return (
      <div>
        <HeaderBar />
      </div>
    );
  }
}

export default Landing;
