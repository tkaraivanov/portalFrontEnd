import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../css/shared-styles.js';
import '../components/worbli-footer.js';
import '../components/worbli-rpc.js';
import '../components/network-monitor/block-info.js';
import '../components/network-monitor/block-producers.js';
import '../components/side-bar/worbli-snapshot.js';

class NetworkRoute extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        .split {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        .side {
          width: 280px;
        }
        .main {
          flex-grow: 1;
          padding-right: 12px;
        }
        @media only screen and (max-width: 600px){
          :host {
            margin-top: 60px;
          }
          .side{
            order: 0;
            width: 100vw;
          }
          .main {
            order: 1;
            padding-right: 0;
          }
          worbli-snapshot {
            display: none;
          }
        }
  
      </style>

      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KGVQG5T"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->

      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-117118714-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-117118714-1');
      </script>

      <worbli-rpc connect endpoint="https://endpoint-1.worbli.io" jsonrpc="{{jsonrpc}}"></worbli-rpc>

      <div class="split">
        <div class="main">
          <block-producers class="main" jsonrpc="[[jsonrpc]]" producer="[[producer]]" interval="500"></block-producers>
        </div>
        <div class="side">
          <block-info class="side" jsonrpc="[[jsonrpc]]" producer="{{producer}}" interval="500"></block-info>
          <worbli-snapshot></worbli-snapshot>
        </div>
      </div>
      <worbli-footer name="footer"></worbli-footer>
    `;
  }
} window.customElements.define('network-route', NetworkRoute);
