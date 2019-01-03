import React, { Component } from 'react';
import TodoForm from './components/TodoForm/TodoForm'
import TodoList from './components/TodoList/TodoList'
import FilterOptions from './components/Filter/FilterOption'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todoitems: []
    }
  }
  // add item
  onsubmitHandler = (e) => {
    e.preventDefault();
    let item = e.target.elements['todo'].value;
    if (item) {
      this.storeDataInLocalStorage(item);
      this.hydrateState();
      e.target.elements['todo'].value = "";
    }
  }
  // add item finished here

  storeDataInLocalStorage = (item) => {
    let data = this.fetchDataFromStorage();
    let todoitem = {
      'id': new Date().valueOf(),
      'item': item,
      'isComplete': false
    };
    data.push(todoitem);
    localStorage.setItem('react-todo', JSON.stringify(data));
  }

  //hydrate state with storage data
  hydrateState = () => {
    let data = this.fetchDataFromStorage();
    this.setState({ todoitems: data.reverse() });
  }

  fetchDataFromStorage = () => {
    return JSON.parse(localStorage.getItem('react-todo')) || [];
  }


  /* check box click handler */
  handleTaskFinish = (e) => {
    let isChecked = e.target.checked;  //is checked or not
    let parent = e.target.parentNode; //parent or "todoitem container"
    let id = parent.dataset.id;   //fetch the id of todo item
    parent.classList.toggle('completed');
    let data = this.fetchDataFromStorage();  //fetch the current state
    for (let i = 0; i < data.length; i++) { // look for the checked item
      if (data[i].id == id) {
        data[i].isComplete = isChecked; //set status as completed
      }
    }
    localStorage.setItem('react-todo', JSON.stringify(data)); // update new list of items in storage
    this.hydrateState(); // update state

  }

  handleDelete = (e) => {
    let parent = e.target.parentNode;
    let id = parent.dataset.id;
    let data = this.fetchDataFromStorage();
    let newData = []
    for (let i = 0; i < data.length; i++) { // look for the checked item
      if (data[i].id != id) {
        newData.push(data[i]);
      }
    }
    localStorage.setItem('react-todo', JSON.stringify(newData)); // update new list of items in storage
    this.hydrateState();
  }

  showPendingTodos = () => {
    let data = this.fetchDataFromStorage();
    let pendingTodos = data.filter(item => {
      return item.isComplete == false;
    })
    this.setState({ todoitems: pendingTodos });
  }

  showFinishedTodos = () => {
    let data = this.fetchDataFromStorage();

    let finishedTodos = data.filter(item => {
      return item.isComplete == true;
    })
    this.setState({ todoitems: finishedTodos });
  }
  showAllTodos = () => {
    this.setState({ todoitems: this.fetchDataFromStorage() });
  }


  componentDidMount() {
    this.hydrateState();
  }

  render() {
    let data = null;
    //show list only if atleat one item is available
    if (this.state.todoitems.length) {
      data = <TodoList
        items={this.state.todoitems}
        completeTask={this.handleTaskFinish}
        deleteItem={this.handleDelete}
      />
    }
    else {
      data = <h1 style={{ textAlign: 'center', margin: "25px 0" }} >Add new tasks</h1>
    }

    return (
      <div className="container">
        <h1 className="Logo" >todos</h1>
        <TodoForm onsubmit={this.onsubmitHandler} />
        {data}
        <FilterOptions
          showAll={this.showAllTodos}
          showPending={this.showPendingTodos}
          showFinished={this.showFinishedTodos}
        />

        <h3 className="credit"  >Design and developed by
            <a href='https://www.instagram.com/hussain.codes/' target="_blank" rel="noopener noreferrer" > Gulam Hussain</a>
        </h3>

      </div>
    );
  }
}

export default App;
