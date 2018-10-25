import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {connect} from '../libraries/eosjs.js';
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
        },
        eos: {
            type: Object,
        },
    };
  }

  _connect(){
    const network = {
        blockchain:'eos',
        protocol:'https',
        host:'nodes.get-scatter.com',
        port: 443,
        chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    };
    const Eos = connect();
    const eosOptions = {expireInSeconds:60};
    const requiredFields = {accounts:[network]};

    ScatterJS.plugins(new ScatterEOS());
    ScatterJS.scatter.connect("worbli")
    .then(connected => {
        this.scatterOpen = connected;
        if(!connected) return false;
        this.scatter = ScatterJS.scatter;  
        this.scatter.getIdentity(requiredFields)
        .then(() => {
            const account = this.scatter.identity.accounts.find(x => x.blockchain === 'eos');
            console.log(account);
            const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
            console.log(transactionOptions);

            //this is causing some issues 
            // TypeError: e is not a constructor at t.eos (scatterjs-plugin-eosjs2.js:179) at scatter.getIdentity.then
            const eos = this.scatter.eos(network, Eos, eosOptions);
            console.log(eos);

            // eos.transfer(account.name, account.name, '1.0100 EOS', 'memo', transactionOptions)
            // .then(trx => {
            //     console.log(`Transaction ID: ${trx.transaction_id}`);
            // })
            // .catch(error => {
            //     console.error(error);
            // });

        })
        .catch(error => {
            console.log(error);
        });
        window.ScatterJS = null;
    });
  }

  _transfer(){

  }
} window.customElements.define('worbli-scatter', WorbliScatter);