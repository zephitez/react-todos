import React from 'react';

import TodosListItem from './todos-list-item';

export default class CreateTodo extends React.Component{
constructor(props) {
  super(props);
  this.handleCreate = this._handleCreate.bind(this);

  this.state = {
    errors: null
  }
}

_renderError() {
  if (!this.state.error) {
    return null;
  } return <div style={{ color: 'red' }}>{this.state.error} </div>
}



  render() {
    return (
      <form onSubmit={this.handleCreate}>
        <input type="text" placeholder="What's for todo?" ref="createInput" />
        <button>Submit</button>
        {this._renderError()}
      </form>

    );
  }

  _handleCreate(e) {
    e.preventDefault();

    const createInput = this.refs.createInput;
    const task =createInput.value;
    const validateInput = this._validateInput(task);

    if (validateInput) {
      this.setState({ error: validateInput })
      return;
    }
    this.setState({error: null });
    this.props.createTask(task);
      this.refs.createInput.value = '';
  }

  _validateInput(task) {
    if (!task) {
       return 'Please enter a task.';

    } else if ( _.find(this.props.todos, todo => todo.task === task)) {
      return 'Task already exists.';
    }
    return null;
  }
}
