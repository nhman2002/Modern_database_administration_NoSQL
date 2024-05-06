class ErrorMess extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<section class="error">
        <ul class="error-list">
            <li class="error-item">fs</li>
        </ul>
    </section>`;
    }
}

async function createErrorMess() {
    await customElements.define('error-mess', ErrorMess);
    let errorMess = document.querySelector('error-mess');
    console.log(errorMess);
}
createErrorMess();