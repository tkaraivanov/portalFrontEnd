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
        },
        scatterOpen: {
            type: Boolean,
            value: false,
        }
    };
  }

  _connect(){
    console.log(ScatterJS);
    console.log(ScatterEOS);
    ScatterJS.plugins( new ScatterEOS() );
    ScatterJS.scatter.connect("WORBLI")
    .then(connected => {
        this.scatterOpen = connected;
        if(!connected) return false;
        this.scatter = ScatterJS.scatter;  
        console.log(this.scatter);  
        window.ScatterJS = null;
    });
  }
} window.customElements.define('worbli-scatter', WorbliScatter);