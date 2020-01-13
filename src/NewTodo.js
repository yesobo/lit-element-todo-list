import { LitElement, html } from 'lit-element';

class NewTodo extends LitElement {
  __createTask(e) {
    const task = {
      description: this.description,
      done: false,
    };
    let create = new CustomEvent('create', {
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
      <form>
        <input type="text" @input=${this.__changeDescription} .value=${this.description} />
        <button type="button" @click=${this.__createTask}>New</button>
      </form>
    `;
  }
}

customElements.define('new-todo', NewTodo);
