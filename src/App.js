import React from 'react';

import Blurb from './components/Blurb';
import DataSelector from './components/DataSelector';
import CovariancePlot from './components/CovariancePlot';

import initialPoints from './misc/initialPoints.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.onDataChange = this.onDataChange.bind(this);
  }

  onDataChange(data) {
    this.setState((prevState) => ({
      ...prevState,
      data,
    }));
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Blurb />
        <DataSelector
          initialValue={ initialPoints.points }
          onDataChange={ this.onDataChange }
        />
        <CovariancePlot 
          data={ data }
        />
      </div>
    );
  }
}

export default App;
