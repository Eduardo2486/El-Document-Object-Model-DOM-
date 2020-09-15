import {LitElement, html, css} from 'lit-element';

class PanelDetalleComponent extends LitElement{

    static get properties(){
        return {
            personaje: {type: Object}
        }
    }

    constructor(){
        super();
        this.personaje = {};
    }

    static get styles(){
        return css`
            :host{
                display: block;
            }
            ul{
                margin: 0 60px;
                padding: 0;
                font-family:Arial;
            }
            li{
                overflow:hidden;
                font-size:1.5em;
                margin:10px 5px ;
            }
            .left{
                float:left;
            }
            .right{
                float:right;
            }
        `;
    }


    renderObjecto(objecto){
        console.log("pNALE",this.personaje);
        let htmlTemplate = [];
        Object.entries(objecto).forEach(([key,value]) => {
            htmlTemplate.push(html`<li><span class="left">${key}</span> <span class="right">${value}</span></li>`);
        });
        return htmlTemplate;
    }

    renderObjectos(array){
        let htmlTemplate = [];
        array.forEach(element => {
            Object.entries(element).forEach(([key,value]) => {
                htmlTemplate.push(html`<li><span class="left">${key}</span> <span class="right">${value}</span></li>`);
            });
            htmlTemplate.push(html`<li>----------------------------------------------------------</li>`);
        });
            
        return htmlTemplate;
    }

    render(){
        return html`
            <div>
                <ul>
                ${console.log("PANEL",this.personaje)}
                </ul>
            </div>
        `;
    }

}

//  ${this.personajeInfo.length < 2 ? this.renderObjecto(this.personajeInfo[0]) : this.renderObjectos(this.personajeInfo)}

customElements.define('panel-detalle-component', PanelDetalleComponent);