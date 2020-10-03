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

    this.state = {
      textAreaValue: initialTextAreaValue,
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onPlotClick = this.onPlotClick.bind(this);

    this.updateData = this.updateData.bind(this);
    this.updateData(); // this component is probably too smart
  }

  onTextAreaChange(e) {
    const { value } = e.target;

    this.setState((prevState) => ({
      ...prevState,
      textAreaValue: value,
    }));
  }

  onPlotClick(e) {
    this.updateData();
  }

  updateData() {
    const { textAreaValue } = this.state;
    const data = parseTextArea(textAreaValue);

    const { onDataChange } = this.props;
    onDataChange(data);
  }

  render() {
    const { textAreaValue } = this.state;

    return (
      <div>
        <h2>Data</h2>
        <p>Add data points as a series of `x, y` pairs (one per line)</p>

        <textarea
          value={ textAreaValue }
          onChange={ this.onTextAreaChange }
          rows={15}
          cols={50}
        />

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
