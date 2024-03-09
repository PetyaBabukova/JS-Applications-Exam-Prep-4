import { html } from '../../node_modules/lit-html/lit-html.js';

const navigationTemplate = (isLogged) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
    <div>
        <a href="/catalog">Fun Facts</a>
    </div>
    ${isLogged
        ? html`
        <div class="user">
            <a href="/create">Add Fact</a>
            <a href="/logout">Logout</a>
        </div>`
        : html`
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/logout">Register</a>
    </div>`
    }
</nav>
`;

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user)
}