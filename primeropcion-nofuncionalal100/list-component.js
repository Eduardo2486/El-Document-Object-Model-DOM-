import {LitElement, html, css} from 'lit-element';

import "./list-element-component.js";

class ListComponent extends LitElement{
    static get properties(){
        return {
            personajes:{type:Array}
        }
    }

    constructor(){
        super();
        this.personajes = this.personajes;
    }

    static get styles(){
        return css`
            :host{
                display:inline-block;
                width:170px;
            }
            .list{
                width:170px;
                list-style-type:none;
                margin:0;
                padding:0;
            }
        `;
    }
    render(){
        return html`
            <div>
                <ul class="list">
                    ${this.personajes.map( personaje => html`<list-element-component nombre="${personaje.name}"></list-element-component>`)}
                </ul>
            </div>
        `;

    }

}

customElements.define('list-component', ListComponent);