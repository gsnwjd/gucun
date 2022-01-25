
import gsap from 'gsap'

let areas=document.querySelectorAll('.areas .type li')
let t2 = gsap.timeline({delay:0.2})
t2.staggerTo(areas,0.2, {opacity:1, ease: "power2.inOut" },0.1)
.to(".pt", 0.2, {opacity:1, ease: "power2.inOut" } )
.to("#ptcard", 0.2, {opacity:1, ease: "power2.inOut" } )

