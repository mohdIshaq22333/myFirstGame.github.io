

let anime=document.querySelector("#anime");
let cc=anime.getContext("2d");
let x=1;
let y;
anime.width=window.innerWidth;
anime.height=window.innerHeight;


//check it
let mouse={
    x: innerWidth/2,
    y: innerHeight/2
}

let colors=[
    "red",
    "green",
    "yellow",
    "orange"
]


//logo
const logo={
    w:200,
    h:200,
    x:20,
    y:0,
    speed:5,
    dx:0,
    dy:0
}

let image=document.querySelector("#hid");
function drawimage(){
    cc.drawImage(image, logo.x, logo.y,logo.w, logo.h);
    
}

let gravity=1;
let friction = 0.60; //you can change it 

    //event listeners
    addEventListener("mousemove", function(event){
        mouse.x=event.clientX;
        mouse.y=event.clientY;
    })

    addEventListener("resize", function(event){      //see event v.i
         anime.width=innerWidth;
         anime.height=innerHeight;

         init();
    })
    addEventListener("click", function(){
        init();

    })

    function randomIntFromRange(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    // function randomIntFromRange(min,max){
    //     return Math.floor(Math.random()*(max-min+1)+min);
    // }

function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)];
}

    function Ball(x,y,dx,dy,radius,color){
        this.x=x;
        this.y=y;
        this.dx=dx;
        this.dy=dy
        this.radius=radius;
        this.color=color;
        this.update=function(){
            drawimage();
            if(this.y+this.radius+this.dy>anime.height){
                this.dy= -this.dy * friction; //*friction will make it decrease little by little
            }else{
                this.dy+=gravity;    //see the logic first +++++ then this plus becomes - by upper condition //then our this condition make them + and again it falls
            }

            if(this.x+this.radius+this.dx>anime.width || this.x-this.radius<=0){
                this.dx= -this.dx * friction; 
            }
          
            this.x+=this.dx;
            this.y+=this.dy;
            this.draw();
        };

this.draw = function(){
    // x=Math.floor(Math.random)*anime.width
    // y=Math.floor(Math.random)*anime.height
    // console.log("working")

cc.beginPath();
cc.arc(this.x,this.y,this.radius,0,Math.PI*2);
cc.fillStyle=this.color;
cc.fill();
cc.stroke();     //by this the line will be more define
cc.closePath();
};
}

let ball;
let ballArray=[];
function init(){
  
    ballArray=[];
    for(let i=0; i<100; i++){
        let radius=randomIntFromRange(10,30);          
        let x= randomIntFromRange(radius,anime.width-radius)
    let y= randomIntFromRange(0,anime.height-radius)
    let dx=randomIntFromRange(-2,2);    
    let dy=randomIntFromRange(-2,2);         
    let color=randomColor(colors);         


                ballArray.push(new Ball(x,y,dx,dy,radius,color));
  
//    ball= new Ball(anime.width/2,anime.height/2,2,30,"red",); //see this new ball

    }
}
        

function animate(){
    

    requestAnimationFrame(animate);

    cc.clearRect(0,0, anime.width,anime.height);
    // cc.fillText("Cool text moving with mouse",mouse.x,mouse.y); //check this text
    for( let i=0; i<ballArray.length; i++){
        ballArray[i].update();

    }
}


init();
animate();


//20 min