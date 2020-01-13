import { LitElement, html } from 'lit-element';

class TodoItem extends LitElement {
  static get properties() {
    return {
      value: { type: Object },
    };
  }

  render() {
    return html`
      <div>${this.value.description} - ${this.value.done}</div>
    `;
  }
}

customElements.define('todo-item', TodoItem);
