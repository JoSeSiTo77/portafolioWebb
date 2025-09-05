const cards = document.querySelectorAll(".containers");
const footer2 = document.querySelector(".footer2");
const footer = document.querySelector(".footer");
const nombre = document.querySelector(".nombre");
const introduccion = document.querySelector(".introduccion");
const contactame = document.querySelector(".contactame");



let tiempodescroll;
let posiciondescroll = 0;
let pantalla = 1;
let animando = false;
let typeNombre, typeIntro;
let escribiendo = false;

if (pantalla === 1) document.body.style.overflow = "hidden";



function activarFlotante(card) {
    if (pantalla !== 1) return;
    card.addEventListener("animationend", () => {
        card.classList.remove("animate__animated", "animate__zoomInLeft", "animate__zoomInRight", "animate__zoomOutLeft", "animate__zoomOutRight");
        card.classList.add("flotante");
    }, { once: true });
}

function activarSombra(foot) {
    foot.addEventListener("animationend", () => {
        foot.classList.remove("animate__animated", "animate__zoomInLeft", "animate__zoomInRight", "animate__zoomOutLeft", "animate__zoomOutRight");
        foot.classList.add("sombra");
    }, { once: true });
}


function iniciarTypeIt(nombreTxt, introTxt) {
    // Cancelar animaciones anteriores
    if (typeNombre) typeNombre.destroy();
    if (typeIntro) typeIntro.destroy();

    nombre.innerHTML = "";
    introduccion.innerHTML = "";

    contactame.style.pointerEvents = "none";
    animando = true; // bloquear scroll



    let txts=[], txt="", seguir=true, char="";
    let ccierre=0, cuenta=0;

    for (let i=1;i<=introTxt.length; i++) {
        let ch=introTxt[i-1];

        if (ch==="<") {
            seguir=false;
            char="<";
            ccierre=0;

            while (i<introTxt.length) {
                i++;
                char+=introTxt[i-1];
                if (introTxt[i-1]===">") {
                    ccierre++;
                    if (ccierre===2) break;
                }
            }

            txt+=char;
            cuenta++;
            char="";
            seguir=true;
            ccierre=0;
            continue;
        }

        if (seguir) {
            txt+=ch;
            cuenta++;
        }

        if (cuenta>=80 && seguir) {
            txts.push(txt);
            txt="";
            cuenta=0;
        }
    }


    if (txt.length > 0) txts.push(txt);

    console.log(txts);
    for (let i = 0; i < txts.length; i++) {

        let linea = document.createElement("span");
        introduccion.appendChild(linea);

        new TypeIt(linea, {
            strings: [txts[i]],
            speed: 1,
            cursor: false,
            html: true,
            afterComplete: () => {
                if (i === txts.length - 1) {
                    contactame.style.pointerEvents = "all";
                    animando = false;
                }
            }
        }).go();
    }

    typeNombre = new TypeIt(".nombre", {
        strings: [nombreTxt],
        speed: 1,
        cursor: false
    }).go();
}


cards.forEach(card => {
    if (card.classList.contains("central")) return;
    card.style.display = "none";
});


window.addEventListener("wheel", (e) => {
    if (pantalla !== 1 || animando) return; // bloquear scroll si animando

    animando = true; // bloquear nuevos scrolls
    document.body.style.pointerEvents = "none";

    posiciondescroll = e.deltaY;
    clearTimeout(tiempodescroll);

    tiempodescroll = setTimeout(() => {
        let central = -1;
        cards.forEach((card, i) => {
            if (card.classList.contains("central")) central = i;
        });

        if (posiciondescroll > 0) { // Scroll hacia abajo
            let nextCentral = (central + 1) % cards.length;

            cards.forEach((card, i) => {

                if (i === central) {
                    card.classList.remove("flotante", "central", "animate__zoomInLeft", "animate__zoomInRight");
                    card.classList.add("containers", "animate__animated", "animate__zoomOutRight");
                    card.addEventListener("animationend", () => {
                        document.body.style.pointerEvents = "all";
                    }, { once: true });

                    if (i === 0 || i === 2) {
                        footer.classList.remove("sombra");
                        footer.classList.add("animate__animated", "animate__zoomOutRight");
                        setTimeout(() => {
                            footer.style.display = "none";
                        }, 700);
                    }

                    if (i === 1 || i === 3) {
                        footer2.classList.remove("sombra");
                        footer2.classList.add("animate__animated", "animate__zoomOutRight");
                        setTimeout(() => {
                            footer2.style.display = "none";
                        }, 700);
                    }
                }


                if (i === nextCentral) {
                    //Contenedor
                    card.style.display = "block";
                    card.classList.remove("animate__zoomInLeft", "animate__zoomInRight", "animate__zoomOutLeft", "animate__zoomOutRight", "flotante", "central");
                    card.classList.add("containers", "animate__animated", "animate__zoomInLeft", "central");
                    activarFlotante(card);

                    //Sombra
                    if (i === 1 || i === 3) {
                        footer2.style.display = "block";
                        footer2.classList.remove("animate__animated", "animate__zoomInLeft", "animate__zoomInRight", "animate__zoomOutLeft", "animate__zoomOutRight", "sombra");
                        footer2.classList.add("animate__animated", "animate__zoomInLeft");
                        activarSombra(footer2);
                    }
                    if (i === 0 || i === 2) {
                        footer.style.display = "block";
                        footer.classList.remove("animate__animated", "animate__zoomInLeft", "animate__zoomInRight", "animate__zoomOutLeft", "animate__zoomOutRight", "sombra");
                        footer.classList.add("animate__animated", "animate__zoomInLeft");
                        activarSombra(footer);
                    }
                    // Fondo según la carta que entra

                }
            });

        } else if (posiciondescroll < 0) { // Scroll hacia arriba
            let prevIndex = (central - 1 + cards.length) % cards.length;

            cards.forEach((card, i) => {
                if (i === central) {
                    //Contenedor
                    card.classList.remove("flotante", "central", "animate__zoomInLeft", "animate__zoomInRight");
                    card.classList.add("containers", "animate__animated", "animate__zoomOutLeft");
                    card.addEventListener("animationend", () => {
                        /* animando=false; */
                        document.body.style.pointerEvents = "all";
                    }, { once: true });
                    //Sombra
                    if (i === 0 || i === 2) {
                        footer.classList.remove("sombra");
                        footer.classList.add("animate__animated", "animate__zoomOutLeft");
                        setTimeout(() => {
                            footer.style.display = "none";
                        }, 700);
                    }

                    if (i === 1 || i === 3) {
                        footer2.classList.remove("sombra");
                        footer2.classList.add("animate__animated", "animate__zoomOutLeft");
                        setTimeout(() => {
                            footer2.style.display = "none";
                        }, 700);
                    }

                }

                if (i === prevIndex) {
                    card.style.display = "block";
                    card.classList.remove("animate__zoomInLeft", "animate__zoomOutLeft", "animate__zoomInRight", "animate__zoomOutRight", "flotante", "central");
                    card.classList.add("containers", "animate__animated", "animate__zoomInRight", "central");
                    activarFlotante(card);

                    //Sombra
                    if (i === 1 || i === 3) {
                        footer2.style.display = "block";
                        footer2.classList.remove("animate__animated", "animate__zoomInLeft", "animate__zoomInRight", "animate__zoomOutLeft", "animate__zoomOutRight", "sombra");
                        footer2.classList.add("animate__animated", "animate__zoomInRight");
                        activarSombra(footer2);
                    }
                    if (i === 0 || i === 2) {
                        footer.style.display = "block";
                        footer.classList.remove("animate__animated", "animate__zoomInLeft", "animate__zoomInRight", "animate__zoomOutLeft", "animate__zoomOutRight", "sombra");
                        footer.classList.add("animate__animated", "animate__zoomInRight");
                        activarSombra(footer);
                    }
                }
            });
        }
        //Investigar línea siguiente.
        const centralCard = Array.from(cards).find(card => card.classList.contains("central"));

        if (centralCard && centralCard === cards[0]) {
            contactame.classList.remove("contactamedes");
        } else {
            contactame.classList.add("contactamedes");
        }

        cards.forEach((card, i) => {
            if (card.classList.contains("central")) {
                switch (i) {
                    case 0:
                        iniciarTypeIt("José Murillo", "Estoy listo para ti, listo para cumplir tu requisito, listo para cumplir tus sueños a manera web, listo para desarrollar,<br>¿Tú estás listo para mí?<br><b>Contáctame ahora:</b><br>");
                        gsap.to(document.body, {
                            "--c1": "#4d4d4d",
                            "--c2": "rgba(111,71,62)",
                            duration: 1
                        });
                        break;
                    case 1:
                        iniciarTypeIt("Tecnologías:", "Tengo un amplio conocimiento en tecnología para el desarrollo fullStack que sigo perfeccionando a lo largo del tiempo solo para ti :)<br>");
                        gsap.to(document.body, {
                            "--c1": "#3C3A36",
                            "--c2": "#1b1b1bff",
                            duration: 1
                        });
                        break;
                    case 2:
                        iniciarTypeIt("Cursos:", "He hecho cursos para aprender a programar de la forma más eficaz y eficiente, he logrado consumir bastantes horas en videos para conocer los lenguajes de programación y las herramientas con las cuales me desempeño.<br>");
                        gsap.to(document.body, {
                            "--c1": "#3a3835ff",
                            "--c2": "#2b261bff",
                            duration: 1
                        });
                        break;
                    case 3:
                        iniciarTypeIt("Proyectos:", 'Puedes conocer mi trabajo e ingresar a ellos a través de los siguientes enlaces:<br><br><a href="" class="acolor">xonler.netlify.app</a><br><br><a href="" class="acolor">swaijidance.netlify.app</a><br><br><a href="https://capcuttutorials.netlify.app" class="acolor">capcuttutorials.netlify.app</a>');
                        gsap.to(document.body, {
                            "--c1": "#41403eff",
                            "--c2": "#1b0835ff",
                            duration: 1
                        });
                        break;
                }
            }
        });

    }, 200);
});

