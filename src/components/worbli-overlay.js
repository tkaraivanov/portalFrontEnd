import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../css/shared-styles.js';
import './worbli-join.js';
import './worbli-signin.js';
class WorbliOverlay extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
            --opacity: 0;
            --display-none-block: none;
            position: fixed; 
            display: var(--display-none-block);
            width: 100%; 
            height: 100%; 
            top: 0; 
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2; 
        }

        .overlay{
            opacity: var(--opacity);
            background-color: rgba(0, 0, 0, 0.5); 
            transition: opacity 0.2s ease-in-out;
            position: fixed; 
            display: block;
            width: 100%; 
            height: 100%; 
            top: 0; 
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 3; 
            cursor: pointer; 
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card {
            width: 500px;
            padding: 40px;
            cursor: default;
            margin: 24px;
            padding: 40px;
            color: #757575;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
            0 1px 5px 0 rgba(0, 0, 0, 0.12), 
            0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

      </style>
      
    <div class="overlay" on-click="_hide">
        <a href="/dashboard/email/" id="goEmail"></a>
        <template is="dom-if" if="{{join}}">
            <div class="card" on-click="_clickCard">
                <worbli-join></worbli-join>
            </div>
        </template>

        <template is="dom-if" if="{{!join}}">
            <div class="card" on-click="_clickCard">
                <worbli-signin></worbli-signin>   
            </div>
        </template>
    </div>

    `;
  }
    static get properties() {
        return {
        prop1: {
            type: String,
            value: 'worbli-overlay',
        },
        };
    }

    ready() {
        super.ready();
        window.addEventListener('overlay', (event) => {
            this._show(event.detail.action);
        });
    }

    _show(event) {
        this.updateStyles({'--display-none-block': 'block'});
        setTimeout(()=>{
            this.updateStyles({'--opacity': 1});
        }, 1);
        if (event === 'join') {
            this._join();
        } else {
            this._signIn();
        }
    }

    _hide() {
        this.updateStyles({'--opacity': 0});
        setTimeout(()=>{
            this.updateStyles({'--display-none-block': 'none'});
        }, 200);
    }
    _clickCard(event) {
        event.stopPropagation();
    }

    _join(){
        this.join = true;
    }

    _signIn(){
        this.join = false;
    }
    _sendEmail(){
        console.log('eee')
        this.$.goEmail.click();
        // const email = this.shadowRoot.querySelector('#email').value;
        // fetch(`http://testnetapi.worbli.io/api/v1/send-mail/${email}`)
        // .then((response) => {
        //     console.log(response);
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
    }
    _checkPassword(){
        const email = this.shadowRoot.querySelector('#loginEmail').value;
        const password = this.shadowRoot.querySelector('#password').value;
        const params = {
            headers: {"content-type":"application/json; charset=UTF-8"},
            body: {
                email: email, 
                password: password
            },
            method: "POST"
        }
        fetch('http://testnetapi.worbli.io/api/v1/sign-in/', params)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }


} window.customElements.define('worbli-overlay', WorbliOverlay);