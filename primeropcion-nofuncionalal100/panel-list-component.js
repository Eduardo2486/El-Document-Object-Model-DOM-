import {LitElement, css, html} from 'lit-element';

import './panel-list-element-component';

class PanelListComponent extends LitElement{
    static get properties(){
        return {
            elementos:{type:Array},
            enlaceactivo:{type:String}
        }

    }
    constructor(){
        super();
        this.elementos = [];
        this.enlaceactivo = "";
    }

    static get styles(){
        return css`
            ul{
                list-style-type:none;
                padding:0;
                display:block;
                margin-bottom: 0;
            }
        `;
    }

    render(){
        return html`
            <ul>
                ${this.elementos.map( elemento => html`<panel-list-element-component elemento="${elemento}" .activo="${this.enlaceactivo}"></panel-list-element-component>` )}
            </ul>
        `;
    }
}

customElements.define('panel-list-component', PanelListComponent);