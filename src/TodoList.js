import { html, css, LitElement } from 'lit-element';

import { generateRandomId } from './NewTodo';

import './TodoItem';

const FILTER = {
  ALL: '0',
  DONE: '1',
  UNDONE: '2',
};

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
      filter: { type: Number },
    };
  }

  constructor() {
    super();
    this.title = 'Todo list';
    this.tasks = [];
    this.filter = FILTER.ALL;

    this.__addMockTasks();
  }

  __addMockTasks() {
    this.tasks.push({
      description: 'Mock task 1',
      done: false,
      id: generateRandomId(),
    });
    this.tasks.push({
      description: 'Mock task 2',
      done: false,
      id: generateRandomId(),
    });
    this.tasks.push({
      description: 'Mock task 3',
      done: false,
      id: generateRandomId(),
    });
  }

  __addTask(e) {
    const newTask = e.detail.task;
    this.tasks = [...this.tasks, newTask];
  }

  __markAsDone(id) {
    console.log(`task to remove is ${id}`);
    let task = this.tasks.find(task => task.id === id);
    task.done = !task.done;
    console.log(this.tasks);
  }

  __filterFn(item) {
    this.requestUpdate();

    if (this.filter === FILTER.DONE) {
      return item.done;
    }
    if (this.filter === FILTER.UNDONE) {
      return !item.done;
    }
    return true;
  }

  __changeFilter(e) {
    const value = e.target.value;
    this.filter = value;
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <new-todo @create=${this.__addTask}></new-todo>
      <div>
        <input type="radio" name="filter" value=${FILTER.ALL} @change=${
      this.__changeFilter
    } ?checked=${this.filter === FILTER.ALL}><label>All</label></input>
        <input type="radio" name="filter" value=${FILTER.DONE} @change=${
      this.__changeFilter
    } ?checked=${this.filter === FILTER.DONE}><label>Done</label></input>
        <input type="radio" name="filter" value=${FILTER.UNDONE} @change=${
      this.__changeFilter
    } ?checked=${this.filter === FILTER.UNDONE}><label>Undone</label></input>
      </div>
      <ul>
        ${this.tasks.filter(this.__filterFn.bind(this)).map(
          task =>
            html`
              <todo-item
                .item=${task}
                @done=${() => {
                  this.__markAsDone(task.id);
                }}
              ></todo-item>
            `,
        )}
      </ul>
    `;
  }

  createRenderRoot() {
    return this;
  }
}
