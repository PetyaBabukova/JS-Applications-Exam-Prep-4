import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';
import { itemTemplate } from './templates/item.js'

const catalogTemplate = (items, user) => html`
<h2>Albums</h2>
<section id="dashboard">
    <ul class="card-wrapper">
        ${items.length > 0
            ? items.map(item => itemTemplate(item, user))
            : html`<h2>There are no albums added yet.</h2>`}
    </ul>
</section>
`;

export const catalogView = (ctx) => {
    catalogService.getAll()
        .then(items => {
            ctx.render(catalogTemplate(items, ctx.user))
        })
}
