import React, { Component , PropTypes }   from 'react';
import TodosView              from './TodosView';
import TodosForm              from './TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import { connect }            from 'react-redux';

class Home extends Component {
  static propTypes = {
    todos:    PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static needs = [
    TodoActions.getTodos
  ];

  render() {
    const { todos, episodes, dispatch } = this.props;
    return (
      <div className="center">
        <div className="row">
          <div className="col-sm-12 home-statement">
            <h2>About Data Skeptic</h2>
            <p>Data Skeptic is the weekly podcast that is skeptical of and with data.  We explain the methods and algorithms that power our world in an accessible manner through our short mini-episode discussions and our longer interviews with experts in the field.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-8">
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="home-player">
            </div>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default connect(state => ({ episodes: state.episodes }))(Home)
