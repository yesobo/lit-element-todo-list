import { html, css, LitElement } from 'lit-element';

import './NewTodo';

import './TodoItem';

export class TodoList extends LitElement {
  static get styles() {
    return css`
      :host {
        --todo-list-text-color: #000;

        display: block;
        padding: 25px;
        color: var(--todo-list-text-color);
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      tasks: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'Todo list';
    this.tasks = [];
  }

  __addTask(e) {
    const newTask = e.detail.task;
    this.tasks = [...this.tasks, newTask];
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <new-todo @create=${this.__addTask}></new-todo>
      <ul>
        ${this.tasks.map(
          task =>
            html`
              <todo-item .value=${task}></todo-item>
            `,
        )}
      </ul>
    `;
  }
}
