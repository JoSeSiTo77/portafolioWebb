

const gcontenido3=document.querySelector(".gcontenido3");
const main=document.querySelector(".main");




contactame.addEventListener("click", ()=>{
    gcontenido3.classList.toggle("reaparecer");
    if(gcontenido3.classList.contains("reaparecer")){
        contactame.textContent="Cancelar";
        main.style.opacity="0";
        footer.style.opacity="0";
        footer2.style.opacity="0";
        introduccion.innerHTML="Buena elección";
    }else{
        contactame.textContent="Contactar";
        main.style.opacity="1";
        footer.style.opacity="1";
        introduccion.innerHTML="Estoy listo para ti, listo para cumplir tu requisito, listo para cumplir tus sueños a manera web, listo para desarrollar, <br>¿Tú estás listo para mí?<br><b>Contáctame ahora:</b>";

    } 
});
