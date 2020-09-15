import {LitElement, css, html} from 'lit-element';

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
            li.activo{
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
        return html`
            <ul>
                ${this.elementos.map( elemento => html`<li class="${elemento === this.enlaceactivo ? "activo" : " "}" @click="${()=> this.infoTipo(elemento)}">${elemento}</li>`)}
            </ul>
        `;
    }
}

customElements.define('panel-lista-component', PanelListComponent);