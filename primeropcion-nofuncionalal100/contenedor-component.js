import {LitElement, css, html} from 'lit-element';

import './list-component.js';
import './panel-component.js';

class Contenedor extends LitElement{
    constructor(){
        super();
        this.personajes = [];
        this.mostrarPersonaje = {};
    }

    static get properties(){
        return{
            personajes: {type:Array},
            mostrarPersonaje: {type:Object}
        }
    }

    static get styles(){
        return css`
        .contenedor{
            width:800px;
            margin:0 auto;
        }
        `;
    }

    async firstUpdated(){
        await fetch('https://swapi.dev/api/people/')
            .then(  res =>  res.json() )
            .then( async data => {this.personajes = data.results; this.mostrarPersonaje = this.personajes[0]} )
            .catch( err => this.personajes =  "Actualmente no se puede conectar a la API")
    }

    cambiaPersonaje(event){
        let personaje = this.personajes.filter(personaje => personaje.name === event.detail.nombre )
        this.mostrarPersonaje = personaje[0];
    }

    render(){
        return html`
            <div class="contenedor">
                <list-component .personajes=${this.personajes} @cambiar-personaje=${this.cambiaPersonaje}></list-component>
                <panel-component .personaje=${this.mostrarPersonaje}></panel-component>
            </div>
        `;
    }
}

customElements.define('contenedor-component', Contenedor);