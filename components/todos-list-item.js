import React from 'react';

export default class TodosListItem extends React.Component{
constructor(props) {
  super(props);
  this.state = {
    isEditing: false
  };
  this.onEditClick = this._onEditClick.bind(this);
  this.onCancelClick = this._onCancelClick.bind(this);
  this.onSaveClick = this._onSaveClick.bind(this);
}

_renderTaskSection() {
  const { task, isCompleted } = this.props;
  console.log(this.props);
  const taskStyle = {
    color: isCompleted ? 'blue' : 'red',
    cursor: 'pointer'
  };

   if (this.state.isEditing) {
     return (
       <td>
          <form onSubmit={this.onSaveClick}>
          <input type="text" defaultValue={task} ref="editInput" />
          </form>
       </td>
     );
   }
  return(
    <td onClick={this.props.toggleTask.bind(this, task)} style={taskStyle}>
    {task}
    </td>
  );
}
_renderActionSection() {
  if(this.state.isEditing) {
    return (
      <td>
      <button onClick={this.onSaveClick}>Save</button>
      <button onClick={this.onCancelClick}>Cancel</button>
      </td>
    );
  }
  return (
    <td>
    <button onClick={this.onEditClick}>Edit</button>
    <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
    </td>
  );
}

  render() {
    return (
      <tr>
      {this._renderTaskSection()}
      {this._renderActionSection()}
      </tr>
    );
  }

  _onEditClick() {
    this.setState({
      isEditing: true
    });
  }

  _onCancelClick() {
    this.setState({
      isEditing: false
    });
  }

  _onSaveClick(e) {
      e.preventDefault();

      const oldTask = this.props.task;
      const newTask = this.refs.editInput.value;
      this.props.saveTask(oldTask, newTask);
      this.setState({ isEditing: false });
  }

  _deleteTask(taskToDelete) {
    _.remove(this.state.todos, todo => todo.task ===taskToDelete);
    this.setState({todos: this.state.todos});
  }

}
