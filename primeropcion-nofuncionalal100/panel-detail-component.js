import {LitElement, html, css} from 'lit-element';

class PanelDetailComponent extends LitElement{

    static get properties(){
        return {
            personajeInfo: {type: Array}
        }
    }

    constructor(){
        super();
        this.personajeInfo = [];
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
                    ${this.personajeInfo.length < 2 ? this.renderObjecto(this.personajeInfo[0]) : this.renderObjectos(this.personajeInfo)}
                </ul>
            </div>
        `;
    }

}

customElements.define('panel-detail-component', PanelDetailComponent);