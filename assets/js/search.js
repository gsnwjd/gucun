
import gsap from 'gsap'

let areas=document.querySelectorAll('.areas .type li')
let t2 = gsap.timeline({delay:1})
t2.staggerTo(areas,0.5, {opacity:1, ease: "power2.inOut" },0.5)
.to(".pt", 0.5, {opacity:1, ease: "power2.inOut" } )
.to("#ptcard", 0.5, {opacity:1, ease: "power2.inOut" } )

