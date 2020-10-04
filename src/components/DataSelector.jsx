import React from 'react';

import {
  parseTextArea,
  parsePoints,
} from '../utils/parse';

class DataSelector extends React.Component {
  constructor(props) {
    super(props);

    const { initialValue } = this.props;
    const initialTextAreaValue = parsePoints(initialValue);

    const parseData = parseTextArea(initialTextAreaValue);
    const corrects = parseData['corrects'];

    this.state = {
      textAreaValue: initialTextAreaValue,
      corrects,
    };

    const { onDataChange } = this.props;
    onDataChange(parseData['points']);

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onPlotClick = this.onPlotClick.bind(this);

    this.updateData = this.updateData.bind(this);
  }

  onTextAreaChange(e) {
    const { value } = e.target;

    this.setState(
      (prevState) => ({
        ...prevState,
        textAreaValue: value,
      }),
      () => this.updateData(),
    );
  }

  onPlotClick(e) {
    this.updateData();
  }

  updateData() {
    const { textAreaValue } = this.state;
    const parseData = parseTextArea(textAreaValue);

    this.setState((prevState) => ({
      ...prevState,
      corrects: parseData['corrects'],
    }));

    const { onDataChange } = this.props;
    onDataChange(parseData['points']);
  }

  render() {
    const {
      textAreaValue,
      corrects,
    } = this.state;

    return (
      <div>
        <h2>Data</h2>
        <p>Add data points as a series of `x, y` pairs (one per line)</p>

        <div style={{
          position: 'relative',
        }}>
          <textarea
            value={ textAreaValue }
            onChange={ this.onTextAreaChange }
            rows={15}
            cols={50}
            style={{
              'marginLeft': '20px',
            }}
          />

          <div style={{
            position: 'absolute',
            top: '0',
          }}>
            { corrects.map((isCorrect, i) => {
              const lineHeight = 15.333; // in px
              const style = {
                position: 'absolute',
                top: i*lineHeight + 'px',
                fontSize: '13.333px',
                padding: '2px',
                height: lineHeight + 'px',

                display: 'flex',
                alignItems: 'center',
              };
              if (isCorrect) {
                return <span
                  key={ i }
                  style={{
                    ...style,
                    color: 'green',
                  }}
                >✓</span>;
              } else {
                return <span
                  key={ i }
                  style={{
                    ...style,
                    color: 'red',
                  }}
                >X</span>;
              }
            }) }
          </div>
        </div>

        <p>
          <button
            onClick={ this.onPlotClick }
          >Plot</button>
        </p>
      </div>
    );
  }
}

export default DataSelector;
