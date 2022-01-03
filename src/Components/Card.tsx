import * as React from 'react';
import '../css/Card.css';

interface Props {
  iconText: string;
  title: string;
  subText: string;
}

class Card extends React.Component<Props> {
  render() {
    return (
      <div className='card'>
        <div className='icon'>
          <i className='material-icons md-24'>{this.props.iconText}</i>
        </div>
        <p className='title'>{this.props.title}</p>
        <p className='text'>{this.props.subText}</p>
      </div>
    );
  }
}

export default Card;
