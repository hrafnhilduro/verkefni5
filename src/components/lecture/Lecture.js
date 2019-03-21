import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './lecture.scss';
import './listItem.scss';

class Lecture extends Component {

  render() {
    const { lecture } = this.props;
    const { finished } = lecture;
    return (
      <div className="list__col">
        <Link className= "listItem" to= {`/${lecture.slug}`}>
          <div className="listItem__image">
            <img src= {`${lecture.thumbnail}`} alt=''></img>
          </div>
          <div className="listItem__bottom">
            <div className="listItem__text">
                <span className="listItem__category"> {lecture.category} </span>
                <h1 className="listItem__title"> {lecture.title} </h1>
            </div>
            {finished ?
              <p className="listItem__finished"> ✓ </p> : ''
            }
          </div>
        </Link>
      </div>
    );
  }
}

export default Lecture;
