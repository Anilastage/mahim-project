async function loadComponent(selector, file) {
    const element = document.querySelector(selector);

    if (!element) return;

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        element.innerHTML = await response.text();

        document.dispatchEvent(
            new CustomEvent("componentLoaded", {
                detail: selector
            })
        );
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("#navbar", "includes/navbar.html");
    await loadComponent("#footer", "includes/footer.html");
});