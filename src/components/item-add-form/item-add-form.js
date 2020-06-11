import React, { Component } from "react";

import "./item-add-form.css";

export default class ItemAddForm extends Component {
  constructor() {
    super();
    this.state = {
      label: "",
    };

    this.onLabelChange = (event) => {
      this.setState({
        label: event.target.value,
      });
    };

    this.onSubmit = (event) => {
      event.preventDefault();
      this.props.onAddItem(this.state.label);
      this.setState({
        label: "",
      });
    };
  }

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="What needs to be done?"
          value={this.state.label}
          onChange={this.onLabelChange}
        />

        <button className="btn btn-outline-secondary">Add</button>
      </form>
    );
  }
}
