import React, { Component } from 'react';

import './filters.scss';

class Filter extends Component {
    state = {
        active: [],
    }

    onClickHandler = (type) => (e) => {
      const { active } = this.state;
      const { onFilter } = this.props;
      const { target } = e;

      target.classList.toggle('filters__filter--active');

      if (active.includes(type)) {
        active.splice(active.indexOf(type), 1);
      } else {
        active.push(type);
      }

      onFilter(active);
    }

  render() {
    return (
      <ul className="filters">
        <li>
          <button className="filters__filter filters__filter--html" onClick={this.onClickHandler('html')}>HTML</button>
        </li>
        <li>
          <button className="filters__filter filters__filter--css" onClick={this.onClickHandler('css')}>CSS</button>
        </li>
        <li>
          <button className="filters__filter filters__filter--js" onClick={this.onClickHandler('javascript')}>JS</button>
        </li>
      </ul>
    );
  }
}

export default Filter;
