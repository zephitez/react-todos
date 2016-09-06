import React from 'react';
import TodosList from './todos-list';
import CreateTodo from './create-todo';


const todos = [
  {
    task: 'make React tutorial',
    isCompleted: false
  },
  {
    task: 'eat dinner',
    isCompleted: true
  }
];

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      todos
    };
    this.createTask = this._createTask.bind(this);
    this.toggleTask = this._toggleTask.bind(this);
    this.saveTask = this._saveTask.bind(this);
    this.deleteTask = this._deleteTask.bind(this);

  }

  render() {
    return (
      <div>
      <h1>React To Do App</h1>
      <CreateTodo todos={this.state.todos} createTask={this.createTask} />
      <TodosList
      todos={this.state.todos}
      toggleTask={this.toggleTask}
      saveTask={this.saveTask}
      deleteTask={this.deleteTask}
      />
      </div>
    );
  }

_toggleTask(task) {
  const foundTodo = _.find(this.state.todos, todo => todo.task === task);
  foundTodo.isCompleted = !foundTodo.isCompleted;
  this.setState({ todos: this.state.todos });

}
_createTask(task) {
  this.state.todos.push({
    task,
    isCompleted: false
  });
  this.setState({ todos: this.state.todos})
}

_saveTask(oldTask, newTask) {
  const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
  foundTodo.task = newTask;
  this.setState({ todos: this.state.todos })
}

_deleteTask(taskToDelete) {
  _.remove(this.state.todos, todo => todo.task === taskToDelete);
  this.setState({todos: this.state.todos})
}



}
