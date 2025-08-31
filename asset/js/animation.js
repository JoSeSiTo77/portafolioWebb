const cards=document.querySelectorAll(".containers");

let tiempodescroll;
let posiciondescroll=0;
let pantalla=1;
if(pantalla===1) document.body.style.overflow="hidden";
function activarFlotante(card){
    if(pantalla!==1) return;
    card.addEventListener("animationend",()=>{
        card.classList.remove("animate__animated","animate__zoomInLeft","animate__zoomInRight","animate__zoomOutLeft","animate__zoomOutRight");
        card.classList.add("flotante");
    },{once:true});
}

window.addEventListener("wheel",(e)=>{
    if(pantalla!==1) return;
    
    posiciondescroll=e.deltaY;
    clearTimeout(tiempodescroll);

    tiempodescroll=setTimeout(()=>{
        let central=-1;
        cards.forEach((card,i)=>{
            if(card.classList.contains("central")){
                central=i;
            }
        });

        if(posiciondescroll>0){
            let nextcentral=(central+1)%cards.length;

            cards.forEach((card,i)=>{
                if(i===central){
                    card.classList.remove("flotante");
                    card.className="containers containers1 animate__animated animate__zoomOutRight";
                    card.classList.remove("central");
                    card.addEventListener("animationend",()=>{card.style.display="none";},{once:true});
                }
                if(i===nextcentral){
                    card.style.display="block";
                    card.className="containers containers1 animate__animated animate__zoomInLeft central";
                    activarFlotante(card);
                }
            });

        }else if(posiciondescroll<0){
            let prevIndex=(central-1+cards.length)%cards.length;

            cards.forEach((card,i)=>{
                if(i===central){
                    card.classList.remove("flotante");
                    card.className="containers containers1 animate__animated animate__zoomOutLeft";
                    card.classList.remove("central");
                    card.addEventListener("animationend",()=>{card.style.display="none";},{once:true});
                }
                if(i===prevIndex){
                    card.style.display="block";
                    card.className="containers containers1 animate__animated animate__zoomInRight central";
                    activarFlotante(card);
                }
            });
        }
    },200);
});

