 /*
        let play=this.$refs.play
        let pause = this.$refs.pause
        let resume = this.$refs.resume
        let reverse = this.$refs.reverse
        let restart = this.$refs.restart
        */
       import gsap from 'gsap'
       
       let tl = gsap.timeline();

       tl.to(".green", {duration: 1, x: 200})
           .to(".orange", {duration: 1, x: 200, scale: 0.2}, "+=1")
           .to(".grey", {duration: 1, x: 200, scale: 2, y: 20}, "greyAndPink") 
           .to(".pink", {duration: 1, x: 200, rotation: 360}, "greyAndPink"); 
       /*
       play.onclick = function() {
           tl.play();
       }

       pause.onclick = function() {
           tl.pause();
       }

       resume.onclick = function() {
           tl.resume();
       }

       reverse.onclick = function() {
           tl.reverse();
       }

       restart.onclick = function() {
           tl.restart();
       }
       */
/*
let num_all=document.querySelectorAll('.row1-left ul li').length
let colors=times_color(num_all-1)
setInterval(all_keyframes, 31000)
all_keyframes()

function all_keyframes(){
    let time=0
    let num=num_all
    for(let i=0;i<num-1;i++){
        key(i*6,i)
    }
    restart(num-1,6*(num-1))
}

function restart(i,c){
    let t2 = new TimelineMax({delay:c})
    let cube_ul=(223*i)
    let left_ul=(540*i)
    let t_ul=(46*i)
    t2.add( TweenLite.to('.cube ul', 0, { x:"0",ease:Power2.easeInOut }))
    t2.add( TweenLite.to('.row1-left ul', 0, { x:"0", ease:Power2.easeInOut }) )
    t2.add( TweenLite.to('.row1-t .row1-t-one',0, { y:"0",ease:Power2.easeInOut }) )
}
function key(x,y){

    el_start(x);//左图动画
    cube_img(x);//右图动画

    text_start(x,y);//文字动画
    more(x,y);//more标志动画
}



function el_start(c){
    //总时长4秒
    let t2 = new TimelineMax({delay:c});
    t2.add( TweenLite.to('.row1-left li img', 1.5, { width:540, ease:Power2.easeInOut }) );
    t2.add( TweenLite.to('.row1-img-alpha', 1.1, { left:0, ease:Power2.easeInOut }) );
    t2.add( TweenLite.to('.row1-left ul', 0.1, { opacity:0, ease:Power2.easeInOut }) );

    t2.add( TweenLite.to('.row1-left ul', 0.1, { x:"-=540", ease:Power2.easeInOut }) );//#
    t2.add( TweenLite.to('.row1-left li img', 0.1, { width:600, ease:Power2.easeInOut }) );
    t2.add( TweenLite.to('.row1-img-alpha', 0.1, { left:540, ease:Power2.easeInOut }) );

    t2.add( TweenLite.to('.row1-left ul', 1, {opacity:1, ease:Power2.easeInOut }) );
}
function text_start(c,i){
    let t2 = new TimelineMax({delay:c});

    t2.add( TweenLite.to('.row1-t .row1-t-one', 1.5, { opacity:0,delay:1.5, ease:Power2.easeInOut }) );
    t2.add( TweenLite.to('.row1-t .row1-t-one',1, { y:"-=46",ease:Power2.easeInOut }) );//#
    t2.add( TweenLite.to('.row1-t .row1-t-one', 0.5, { opacity:1, ease:Power2.easeInOut }) );
    c=c>0?c:0
    setTimeout("color_change(colors["+i+"])",(c*1000-3000))
}

function more(c,i){
c=c>0?c:0
let t3=new TimelineMax({delay:(c-0.5)});
t3.add(TweenLite.to('#more',2,{backgroundColor:colors[i]}));

}

function colors_did(arr,i){
    console.log(arr[i])
    color_change(arr[i])
}

function cube_img(c){
    //3.5s
    let t2 = new TimelineMax({delay:c});

    t2.add( TweenLite.to('.cube img', 1.6, { left:-120,delay:1,ease:Power2.easeInOut }) )
    t2.add( TweenLite.to('.cube', 0.3, { opacity:0,ease:Power2.easeInOut }) )

    t2.add( TweenLite.to('.cube ul', 0.5, { x:"-=223",ease:Power2.easeInOut }))//#
    t2.add( TweenLite.to('.cube img', 0.6, { left:0,ease:Power2.easeInOut }) )

    t2.add( TweenLite.to('.cube', 0.5, { opacity:1,ease:Power2.easeInOut }) )

}



function times_color(x){
    let colors=[]
    let id=Math.random()
    for(let j=0;j<x;j++){
        colors.push(color_val(id))
    }
    return colors
}


function color_change(color_em){
    //字体颜色修改
    let txt=document.getElementsByName('r-txt')
    for(let i=0;i<txt.length;i++){
        txt[i].style.color=color_em
    }
}

function color_val(e){
    //字体颜色随机
    let color=[]
    for(let i=0;i<3;i++){
        j=Math.floor(Math.random()*255)
        if(j<30){
            j+=30
            color.push(j)
        }
        else if(j>200){
            j-=40
            color.push(j)
        }
        else{
            color.push(j)
        }
    }
    let color_val='rgb('+color[0]+','+color[1]+','+color[2]+')'
    return color_val
}

*/