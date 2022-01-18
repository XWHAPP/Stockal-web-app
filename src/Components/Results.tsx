import { Box } from '@mui/material';
import * as React from 'react';
import { VictoryLabel, VictoryPie } from 'victory';
import { SentimentResults } from '../Models/SentimentResults';
import Card from './Card';

interface Props {
  stockSentiment: SentimentResults | undefined;
  searchTerm: string | null;
}

interface State {}

class Results extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Props:' + JSON.stringify(this.props));
    console.log('State:' + JSON.stringify(this.state));
    // TODO: Throw toast / popup error
  }

  renderTitle() {
    if (this.props.searchTerm) {
      return <h2>{this.props.searchTerm}'s results</h2>;
    }
  }

  renderSA() {
    const sentiment = this.props.stockSentiment;

    if (sentiment) {
      return (
        <div>
          <div className='content'>
            <Card iconText='+' title='Positivity' subText={sentiment.positivity.toString()} />
            <Card iconText='~' title='Neutrality' subText={sentiment.neutrality.toString()} />
            <Card iconText='-' title='Negativity' subText={sentiment.negativity.toString()} />
          </div>
          <VictoryPie
            // TODO: Add localisation and store texts in en.json
            data={[
              { x: 'Positivity', y: sentiment.positivity },
              { x: 'Neutrality', y: sentiment.neutrality },
              { x: 'Negativity', y: sentiment.negativity },
            ]}
            labels={({ datum }) => datum.x}
            colorScale={['#47B39C', '#FFC154', '#EC6B56']}
            height={250}
            labelComponent={<VictoryLabel style={[{ fontSize: 8 }]} textAnchor={'middle'} />}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <Box sx={{ padding: '0 40px' }}>
        {this.renderTitle()}
        {this.renderSA()}
      </Box>
    );
  }
}

export default Results;
