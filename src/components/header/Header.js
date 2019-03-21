import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

export default class Header extends React.Component {

  static propTypes = {
    category: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
  }

  render() {
    const { category, title, image } = this.props;
    const style = {};

    if( image ) {
      style.backgroundImage = `url(${image})`;
    }

    return (
      <header className="heading heading--main" style={style}>
        <span className="heading__category">{category}</span>
        <h1 className="heading__title">{title}</h1>
      </header>
    );
  }
}
