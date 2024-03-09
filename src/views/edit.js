import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const editTemplate = (item, submitHandler) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form @submit=${submitHandler} class="edit-form">
            <input 
            value=${item.singer}
            type="text" 
            name="singer" 
            id="album-singer" 
            placeholder="Singer/Band" 
            />
            <input 
            type="text" 
            name="album" 
            value=${item.album}
            id="album-album" 
            placeholder="Album" 
            />
            <input 
            type="text" 
            name="imageUrl" 
            value=${item.imageUrl}
            id="album-img" 
            placeholder="Image url" 
            />
            <input 
            type="text" 
            value=${item.release}
            name="release" 
            id="album-release" 
            placeholder="Release date"
             />
            <input 
            type="text" 
            name="label"
            value=${item.label}
            id="album-label" 
            placeholder="Label" 
            />
            <input 
            type="text" 
            value=${item.sales}
            name="sales" 
            id="album-sales" 
            placeholder="Sales" 
            />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export const editView = (ctx) => {
    const id = ctx.params.itemId;

    const submitHandler = (e) => {
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
            return;
        }


        catalogService.edit(id, data)
            .then(() => ctx.page.redirect(`/details/${id}`))
            .catch(err => alert(err))

    }

    catalogService.getOne(id)
        .then(item => {
            ctx.render(editTemplate(item, submitHandler))

        })
}


// export const editView = (ctx) => {

//     const id = ctx.params.itemId
//     const onSubmit = (e) => {
//         e.preventDefault();
//         let isValidData = true;

//         const formData = Object.fromEntries(new FormData(e.currentTarget));
//         Object.entries(formData).forEach(([key, value]) => {
//             if (value == '') {
//                 isValidData = false;
//             }
//         })

//         if (!isValidData) {
//             alert('All fields are required');
//             return
//         } else {

//             const data = {
//                 category: formData.category,
//                 imageUrl: formData['image-url'],
//                 description: formData.description,
//                 moreInfo: formData['additional-info']
//             }

//             catalogService.edit(id, data)
//                 .then(() => {
//                     ctx.page.redirect(`/details/${id}`)
//                 })
//         }
//     }
//     catalogService.getOne(id)
//         .then(item => {
//             ctx.render(editTemplate(item, onSubmit))

//         })
// }