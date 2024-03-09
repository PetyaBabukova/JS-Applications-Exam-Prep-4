import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';


const detailsTemplate = (item, isOwner, isLogged) => html`
            <section id="details">
                <div id="details-wrapper">
                    <p id="details-title">Album Details</p>
                    <div id="img-wrapper">
                        <img src=${item.imageUrl} alt="example1" />
                    </div>
                    <div id="info-wrapper">
                        <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
                        <p>
                            <strong>Album name:</strong><span id="details-album">${item.album}</span>
                        </p>
                        <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
                        <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
                        <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
                    </div>
                    <div id="likes">Likes: <span id="likes-count">0</span></div>
            ${isOwner
        ? html`
        <div class="action-buttons">
            <a href="/edit/${item._id}">Edit</a>
            <a href="/delete/${item._id}">Delete</a>
        </div>`
        : nothing}
            ${isLogged && !isOwner
        ? html`
                    <div class="action-buttons">
                        <a href="/like/${item._id}">Like</a>
                    </div>`
        : nothing}
    </div>
</section>`;

export const detailsView = (ctx) => {
    catalogService.getOne(ctx.params.itemId)
        .then(item => {
            const isOwner = Boolean(item._ownerId === ctx.user?._id);
            const isLogged = Boolean(ctx.user);
            ctx.render(detailsTemplate(item, isOwner, isLogged));
        });
};
