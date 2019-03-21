import React, { Component } from 'react';
import { getLecture, toggleLectureFinish, loadSavedLectures } from '../../api';
import { Route } from 'react-router-dom';

import Item from '../../components/item/Item';
import Header from '../../components/header/Header';
import NotFound from '../../routes/notFound/NotFound';

export default class Lecture extends Component {

  state = {
    lecture: getLecture(this.props.match.params.slug),
  }

  markFinished = (slug) => (e) => {
    const { target } = e;
    const isFinished = target.classList.contains('lecture__finish--finished');
    if (isFinished) {
      target.textContent = 'Klára fyrirlestur';
    } else {
      target.textContent = '✓ Fyrirlestur kláraður';
    }
    target.classList.toggle('lecture__finish--finished');
    toggleLectureFinish(slug, !isFinished);
    this.setState({ lecture : getLecture(this.props.match.params.slug)});
  }

  checkFinished = (slug) => {
    const saved = loadSavedLectures();
    return saved.indexOf(slug) >= 0;
  }

  render() {
    const { lecture } = this.state;
    if(!lecture){
      return <Route component={NotFound} />
    }
    const slug = this.props.match.params.slug;
    const { content } = lecture;
    const { finished } = lecture;
    return (
      <React.Fragment>
        <Header category={lecture.category} title={lecture.title} image={lecture.image} />
        <div className="lecture__col">
          { content.map((item, i) =>
            <Item key={i} item={item} />
          ) }
        </div>
        <footer className="lecture__footer">
          {finished?
            <button onClick={this.markFinished(slug)} className="lecture__finish lecture__finish--finished">✓ Klára fyrirlestur</button>
            :
            <button onClick={this.markFinished(slug)} className="lecture__finish">Klára fyrirlestur</button>
          }
          <a className="lecture__back" href="/">Til baka</a>
        </footer>
      </React.Fragment>
    )
  }
}
