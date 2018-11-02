
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class WorbliEnv extends PolymerElement {

  static get properties() {
    return {
      apiPath: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        value:  'https://api-b.worbli.io/api/v1', 
      },
    };
  }
} window.customElements.define('worbli-env', WorbliEnv);