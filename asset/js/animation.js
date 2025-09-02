const cards=document.querySelectorAll(".containers");
const footer2=document.querySelector(".footer2");
const footer=document.querySelector(".footer");
const nombre=document.querySelector(".nombre");
const introduccion=document.querySelector(".introduccion");


let tiempodescroll;
let posiciondescroll=0;
let pantalla=1;
let animando=false;
let typeNombre, typeIntro;
let escribiendo = false;

if(pantalla===1) document.body.style.overflow="hidden";



function activarFlotante(card){
    if(pantalla!==1)return;
    card.addEventListener("animationend",()=>{
        card.classList.remove("animate__animated","animate__zoomInLeft","animate__zoomInRight","animate__zoomOutLeft","animate__zoomOutRight");
        card.classList.add("flotante");
    },{once:true});
}

function activarSombra(foot){
    foot.addEventListener("animationend",()=>{
        foot.classList.remove("animate__animated","animate__zoomInLeft","animate__zoomInRight","animate__zoomOutLeft","animate__zoomOutRight");
        foot.classList.add("sombra");
    },{once:true});
}


function iniciarTypeIt(nombreTxt, introTxt){
    // Cancelar animaciones anteriores
    if(typeNombre) typeNombre.destroy();
    if(typeIntro) typeIntro.destroy();

    nombre.innerHTML = "";
    introduccion.innerHTML = "";

    contactame.style.pointerEvents = "none";
    animando = true; // bloquear scroll

    typeNombre = new TypeIt(".nombre", {
        strings:[nombreTxt],
        speed:.0000005,
        cursor:false
    }).go();
    typeIntro = new TypeIt(".introduccion", {
        strings:[introTxt],
        speed:.0000005,
        cursor:false,
        afterComplete: () => {
            contactame.style.pointerEvents = "all";
            animando = false; // desbloquear scroll solo después de terminar de escribir
        }
    }).go();
}


// Ocultar todos los contenedores que no sean central al inicio
cards.forEach(card=>{
    if(card.classList.contains("central"))return;
    card.style.display="none";
});


window.addEventListener("wheel",(e)=>{
    if(pantalla!==1 || animando) return; // bloquear scroll si animando

    
/*     if (type3) {
        type3.destroy();
        type3=null;
        introduccion.innerHTML="";
        nombre.innerHTML="";
    }
    if(type4){
        type4.destroy();
        type4=null;
        introduccion.innerHTML="";
        nombre.innerHTML="";
    } */

    animando=true; // bloquear nuevos scrolls
    document.body.style.pointerEvents="none";

    posiciondescroll=e.deltaY;
    clearTimeout(tiempodescroll);

    tiempodescroll=setTimeout(()=>{
        let central=-1;
        cards.forEach((card,i)=>{
            if(card.classList.contains("central")) central=i;
        });

        if(posiciondescroll>0){ // Scroll hacia abajo
            let nextCentral=(central+1)%cards.length;

            cards.forEach((card,i)=>{
                
                if(i===central){
                    card.classList.remove("flotante","central","animate__zoomInLeft","animate__zoomInRight");
                    card.classList.add("containers","animate__animated","animate__zoomOutRight");
                    card.addEventListener("animationend",()=>{
                        document.body.style.pointerEvents="all";
                    },{once:true});

                    if(i===0 || i===2){
                        footer.classList.remove("sombra");
                        footer.classList.add("animate__animated", "animate__zoomOutRight");
                        setTimeout(() => {
                            footer.style.display="none";
                        }, 700);
                    }

                    if(i===1 || i===3){
                        footer2.classList.remove("sombra");
                        footer2.classList.add("animate__animated", "animate__zoomOutRight");
                        setTimeout(() => {
                            footer2.style.display="none";
                        }, 700);
                    }   
                }
                

                if(i===nextCentral){
                    //Contenedor
                    card.style.display="block";
                    card.classList.remove("animate__zoomInLeft","animate__zoomInRight","animate__zoomOutLeft","animate__zoomOutRight","flotante","central");
                    card.classList.add("containers","animate__animated","animate__zoomInLeft","central");
                    activarFlotante(card);

                    //Sombra
                    if(i===1 || i===3){
                        footer2.style.display="block";
                        footer2.classList.remove("animate__animated","animate__zoomInLeft","animate__zoomInRight","animate__zoomOutLeft","animate__zoomOutRight","sombra");
                        footer2.classList.add("animate__animated","animate__zoomInLeft");
                        activarSombra(footer2);
                    }
                    if(i===0 || i===2){
                        footer.style.display="block";
                        footer.classList.remove("animate__animated","animate__zoomInLeft","animate__zoomInRight","animate__zoomOutLeft","animate__zoomOutRight","sombra");
                        footer.classList.add("animate__animated","animate__zoomInLeft");
                        activarSombra(footer);
                    }
                    // Fondo según la carta que entra
                    
                }
            });

        }else if(posiciondescroll<0){ // Scroll hacia arriba
            let prevIndex=(central-1+cards.length)%cards.length;

            cards.forEach((card,i)=>{
                if(i===central){
                    //Contenedor
                    card.classList.remove("flotante","central","animate__zoomInLeft","animate__zoomInRight");
                    card.classList.add("containers","animate__animated","animate__zoomOutLeft");
                    card.addEventListener("animationend",()=>{
                        /* animando=false; */
                        document.body.style.pointerEvents="all";
                    },{once:true});
                    //Sombra
                    if(i===0 || i===2){
                        footer.classList.remove("sombra");
                        footer.classList.add("animate__animated", "animate__zoomOutLeft");
                        setTimeout(() => {
                            footer.style.display="none";
                        }, 700);
                    }

                    if(i===1 || i===3){
                        footer2.classList.remove("sombra");
                        footer2.classList.add("animate__animated", "animate__zoomOutLeft");
                        setTimeout(() => {
                            footer2.style.display="none";
                        }, 700);
                    }
                    
                }

                if(i===prevIndex){
                    card.style.display="block";
                    card.classList.remove("animate__zoomInLeft","animate__zoomOutLeft","animate__zoomInRight","animate__zoomOutRight","flotante","central");
                    card.classList.add("containers","animate__animated","animate__zoomInRight","central");
                    activarFlotante(card);

                    //Sombra
                    if(i===1 || i===3){
                        footer2.style.display="block";
                        footer2.classList.remove("animate__animated","animate__zoomInLeft","animate__zoomInRight","animate__zoomOutLeft","animate__zoomOutRight","sombra");
                        footer2.classList.add("animate__animated","animate__zoomInRight");
                        activarSombra(footer2);
                    }
                    if(i===0 || i===2){
                        footer.style.display="block";
                        footer.classList.remove("animate__animated","animate__zoomInLeft","animate__zoomInRight","animate__zoomOutLeft","animate__zoomOutRight","sombra");
                        footer.classList.add("animate__animated","animate__zoomInRight");
                        activarSombra(footer);
                    }
                }
            });
        }
        cards.forEach((card, i) => {
            if(card.classList.contains("central")){
                
               setTimeout(() => {
            if(i===0){
                contactame.classList.remove("contactamedes");
                contactame.style.pointerEvents = "all";
            } else {
                contactame.classList.add("contactamedes");
                contactame.style.pointerEvents = "none";
            }
        }, 0);
            }
            if(card.classList.contains("central")){
                switch(i){
                    case 0:
                        iniciarTypeIt("José Murillo", "Estoy listo para ti, listo para cumplir tu requisito, listo para cumplir tus sueños a manera web, listo para desarrollar, <br>¿Tú estás listo para mí?<br><b>Contáctame ahora:</b><br>");
                        gsap.to(document.body,{
                            "--c1":"#4d4d4d",
                            "--c2":"rgba(111,71,62)",
                            duration:1 
                        });
                    break;
                    case 1:
                        iniciarTypeIt("Tecnologías:", "Tengo un amplio conocimiento en tecnología para el desarrollo fullStack que sigo perfeccionando a lo largo del tiempo solo para ti :)<br>");
                        gsap.to(document.body,{
                            "--c1":"#3C3A36",
                            "--c2":"#1b1b1bff",
                            duration:1 });
                    break;
                    case 2:
                        iniciarTypeIt("Cursos:", "He hecho cursos para aprender a programar de la forma más eficaz y eficiente, he logrado consumir bastantes horas en videos para conocer los lenguajes de programación y las herramientas con las cuales me desempeño.<br>");
                        gsap.to(document.body,{
                            "--c1":"#3a3835ff",
                            "--c2":"#2b261bff",
                        duration:1 });
                    break;
                    case 3:
                        iniciarTypeIt("Proyectos:", 'Puedes conocer mi trabajo e ingresar a ellos a través de los siguientes enlaces: <a href="" class="acolor">xonler.netlify.app</a><br><a href="" class="acolor">swaijidance.netlify.app</a><br><a href="https://capcuttutorials.netlify.app" class="acolor">capcuttutorials.netlify.app</a>');
                        gsap.to(document.body,{
                            "--c1":"#41403eff",
                            "--c2":"#1b0835ff",
                        duration:1 });
                    break;
                }
            }
        });

    },200);
});

