import { LitElement, html } from 'lit-element';

export function generateRandomId() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

class NewTodo extends LitElement {
  __createTask(e) {
    e.preventDefault();
    const task = {
      description: this.description,
      done: false,
      id: generateRandomId(),
    };
    const create = new CustomEvent('create', {
      detail: {
        task,
      },
    });
    this.description = '';
    this.dispatchEvent(create);
  }

  static get properties() {
    return {
      description: { type: String },
    };
  }

  constructor() {
    super();
    this.description = '';
  }

  __changeDescription(e) {
    this.description = e.target.value;
  }

  render() {
    return html`
      <form @submit=${this.__createTask}>
        <input type="text" @input=${this.__changeDescription} .value=${this.description} />
        <button>New</button>
      </form>
    `;
  }
}

customElements.define('new-todo', NewTodo);
