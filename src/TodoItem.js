import { LitElement, html } from 'lit-element';

class TodoItem extends LitElement {
  static get properties() {
    return {
      item: { type: Object },
    };
  }

  __markAsDone() {
    const doneEvent = new CustomEvent('done');
    this.dispatchEvent(doneEvent);
  }

  render() {
    return html`
      <div>
        ${this.item.description} -
        <input
          name="${this.item.id}_status"
          type="checkbox"
          ?checked=${this.item.done}
          @change=${this.__markAsDone}
        />
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('todo-item', TodoItem);
