import {LitElement, css , html} from 'lit-element';

class ListElementComponent extends LitElement{

    static get properties(){
        return{
            nombre:{type:String}
        }
    }

    constructor(){
        super();
        this.nombre = this.nombre;
    }

    static get styles(){
        return css`
        .list-element{
            background-color:#f99b1e;
            width:100%;
            height:70px;
            font-family:Arial;
            font-size:1.5em;
            margin-bottom:10px;
            text-align:center;
        }
        `;
    }

    clickPersonaje(nombre){
        this.dispatchEvent(new CustomEvent('cambiar-personaje', {detail:{nombre:nombre}, bubbles:true, composed:true}))
    }

    render(){
        return html`
            <li class="list-element" @click="${()=>this.clickPersonaje(this.nombre)}">${this.nombre}</li>
        `
    }

}

customElements.define('list-element-component', ListElementComponent);