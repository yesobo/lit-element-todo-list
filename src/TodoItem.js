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
    this.requestUpdate();
  }

  render() {
    return html`
      <div>
        ${this.item.description} -
        <input
          name="${this.item.id}_status"
          type="checkbox"
          @change=${this.__markAsDone}
          .checked=${this.item.done}
        />
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('todo-item', TodoItem);
