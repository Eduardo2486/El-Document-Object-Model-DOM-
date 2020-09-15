import {LitElement, css, html} from 'lit-element';


class PanelListComponent extends LitElement{

    static get properties(){
        return {
            elemento: {type:String},
            activo:{type:String}
        }
    }

    constructor(){
        super();
        this.elemento = "";
        this.activo = "";
    }

    static get styles(){
        return css`
            li{
                display:inline-block;
                background-color:#f99b1e;
                padding:10px 20px;
                font-size:1.26em;
                font-family: Arial;
            }
            li:hover{
                background-color:#ffc06d;
                cursor:pointer;
            }
            li.active{
                border-bottom:3px solid #a25d00;
            }
        `;
    }

    infoTipo(elemento){
        this.dispatchEvent(new CustomEvent('cambiar-informacion', {
            detail:{info: elemento},
            bubbles: true,
            composed: true
        }));
    }

    render(){
        return html`<li class="${this.elemento === this.activo ? "active" : " "}" @click="${()=> this.infoTipo(this.elemento)}">${this.elemento}</li>`;
    }
}

customElements.define('panel-list-element-component', PanelListComponent);