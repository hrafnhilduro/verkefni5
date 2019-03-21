import React, { Component } from 'react';

// Fall sem sér um að sækja gögnin
import { getLectureList } from '../../api';

import Header from '../../components/header/Header';
import Filter from '../../components/filter/Filter';
import Lectures from '../../components/lectures/Lectures';

export default class Home extends Component {

  state = {
    lectures: getLectureList(),
  }

  onFilter = (active) => {
    this.setState({ lectures: getLectureList(active) });
  }

  render() {
    const { lectures } = this.state;
    return (
      <React.Fragment>
        <Header category="Vefforritun" title="Fyrirlestrar" />
        <Filter  onFilter={this.onFilter} />
        <Lectures lectures= {lectures} />
      </React.Fragment>
    );
  }
}
