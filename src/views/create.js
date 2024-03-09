import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const createTemplate = (SubmitHandler) => html`
<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form @submit=${SubmitHandler} class="create-form">
            <input 
            type="text" 
            name="singer" 
            id="album-singer" 
            placeholder="Singer/Band" 
            />
            <input 
            type="text" 
            name="album" 
            id="album-album" 
            placeholder="Album" 
            />
            <input 
            type="text" 
            name="imageUrl" 
            id="album-img" 
            placeholder="Image url" 
            />
            <input 
            type="text" 
            name="release" 
            id="album-release" 
            placeholder="Release date" 
            />
            <input 
            type="text" 
            name="label" 
            id="album-label" 
            placeholder="Label" 
            />
            <input 
            type="text" 
            name="sales" 
            id="album-sales"
             placeholder="Sales" 
            />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export const createView = (ctx) => {
    const SubmitHandler = (e) => {
        e.preventDefault();

        let isValidData = true;

        const data = Object.fromEntries(new FormData(e.currentTarget));

        Object.entries(data).forEach(([key, value]) => {
            if (value == '') {
                isValidData = false;
            }
        })

        if (!isValidData) {
            alert('All fields are required');
            return
        }

        catalogService.create(data)
            .then(() => ctx.page.redirect('/catalog'))
            .catch(err => alert(err))

    }

    ctx.render(createTemplate(SubmitHandler))
};