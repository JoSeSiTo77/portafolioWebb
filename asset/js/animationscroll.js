const containers = document.querySelectorAll('.containers');

function scrollAnimado(destinoY, duracion) {
    const inicioY = window.scrollY;
    const delta = destinoY - inicioY;
    const startTime = performance.now();

    function animar(time) {
        let tiempo = (time - startTime) / (duracion * 1000); // 0 → 1
        if (tiempo > 1) tiempo = 1;

        // Easing simple
        const ease = tiempo < 0.5 ? 2 * tiempo * tiempo : -1 + (4 - 2 * tiempo) * tiempo;

        window.scrollTo(0, inicioY + delta * ease);

        if (tiempo < 1) requestAnimationFrame(animar);
    }

    requestAnimationFrame(animar);
}

containers.forEach(container => {
    container.addEventListener('click', () => {
        pantalla=2;
        if(container.classList.contains('moviendo')) return;
        container.style.pointerEvents="none";
        container.classList.add('moviendo');

        const pantalla2 = document.querySelector('#pantalla2');
        if (!pantalla2) return;

        const rectPantalla2 = pantalla2.getBoundingClientRect();
        const destinoY = rectPantalla2.top + window.scrollY;

        // Scroll sincronizado con la duración de la animación CSS
        scrollAnimado(destinoY, 1.2); // duración en segundos
    });
});





    



