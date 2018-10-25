import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../libraries/scatterjs-core.js';
import '../libraries/scatterjs-plugin-eosjs2.js';
import '../css/shared-styles.js';

class WorbliScatter extends PolymerElement {
  static get template() {
    return html``;
  }
  static get properties() {
    return {
        connect: {
            type: Boolean,
            value: false,
            observer: '_connect',
        },
        scatter: {
            type: Object,
        }
    };
  }

  _connect(){
    console.log(ScatterJS);
    ScatterJS.plugins( new ScatterEOS() );
    ScatterJS.scatter.connect("WORBLI").then(connected => {
        if(!connected) return false;
        this.scatter = ScatterJS.scatter;    
        window.ScatterJS = null;
    });
  }
} window.customElements.define('worbli-scatter', WorbliScatter);