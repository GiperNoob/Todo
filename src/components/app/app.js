import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends Component {
  constructor() {
    super();
    this.idMax = 1;

    this.CreateTodoItem = (label) => {
      return {
        label,
        id: this.idMax++,
        done: false,
        important: false,
      };
    };

    this.state = {
      todoData: [
        this.CreateTodoItem("Drink Coffee"),
        this.CreateTodoItem("Make Awesome App"),
        this.CreateTodoItem("Have a lunch"),
      ],
      term: "",
      filter: "all",
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((item) => item.id === id);

        const newData = [
          ...todoData.slice(0, index),
          ...todoData.slice(index + 1),
        ];

        return {
          todoData: newData,
        };
      });
    };

    this.addItem = (text) => {
      const newItem = this.CreateTodoItem(text);

      this.setState(({ todoData }) => {
        const newData = [...todoData, newItem];

        return {
          todoData: newData,
        };
      });
    };

    this.ToggleProps = (arr, id, prop) => {
      const index = arr.findIndex((item) => item.id === id);
      const oldItem = arr[index];
      const newItem = {
        ...oldItem,
        [prop]: !oldItem[prop],
      };

      return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
    };

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.ToggleProps(todoData, id, "important"),
        };
      });
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.ToggleProps(todoData, id, "done"),
        };
      });
    };

    this.onSearchChange = (term) => {
      this.setState({ term });
    };

    this.onFilterChange = (filter) => {
      this.setState({ filter });
    };

    this.search = (items, term) => {
      if (term === "") {
        return items;
      }
      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    };

    this.filter = (items, filter) => {
      switch (filter) {
        case "all":
          return items;
        case "active":
          return items.filter((item) => !item.done);
        case "done":
          return items.filter((item) => item.done);
        default:
          return items;
      }
    };
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const countDone = todoData.filter((item) => item.done).length;
    const countToDo = todoData.length - countDone;

    return (
      <div className="todo-app">
        <AppHeader toDo={countToDo} done={countDone} />

        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />

          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onAddItem={this.addItem} />
      </div>
    );
  }
}
