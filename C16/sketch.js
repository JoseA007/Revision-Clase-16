var Trex, TrexRunning
var TrexCollide
var Piso, PisoIMG
var PisoInvisible
var Nubes, NubesIMG
var NubesChiquitas, NubesChiquitasIMG
var Obstaculo1, Obstaculo1IMG
var Obstaculo2IMG
var Obstaculo3IMG
var Obstaculo4IMG
var Obstaculo5IMG
var Obstaculo6IMG
var Puntuacion = 0
var PLAY = 1
var END = 0
var gameState = PLAY
var ObstaculosGrupo
var NubesGrupo
var Restart, RestartIMG
var GameOver, GameOverIMG
var Sonido1MP3
var Sonido2MP3
var Sonido3MP3

function preload(){
    TrexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    TrexCollide = loadAnimation("trexcollide.jpeg");
    PisoIMG = loadAnimation("ground2.png");
    NubesIMG = loadAnimation("cloud.png");
    NubesChiquitasIMG = loadAnimation("cloud.png");
    Obstaculo1IMG = loadImage("obstacle1.png");
    Obstaculo2IMG = loadImage("obstacle2.png");
    Obstaculo3IMG = loadImage("obstacle3.png");
    Obstaculo4IMG = loadImage("obstacle4.png");
    Obstaculo5IMG = loadImage("obstacle5.png");
    Obstaculo6IMG = loadImage("obstacle6.png");
    RestartIMG = loadImage("restart.jpeg");
    GameOverIMG = loadImage("gameover.jpeg");
    Sonido1MP3 = loadSound("jump.mp3")
    Sonido2MP3 = loadSound("checkPoint.mp3")
    Sonido3MP3 = loadSound("die.mp3")
} //Fin de Preload

function setup(){
    createCanvas(600,200);
    Trex = createSprite(50,160,20,20);
    Trex.addAnimation ("Running", TrexRunning);
    Trex.scale = 0.5;
    Trex.addAnimation("TrexCollide", TrexCollide);
    //Trex.debug = true
    Trex.setCollider("circle", 7, 0, 35)

    Piso = createSprite(0,160,2000,10);
    Piso.velocityX = -4;
    Piso.addAnimation("Piso", PisoIMG);

    PisoInvisible = createSprite(0,170,2000,10);
    PisoInvisible.visible = false;

    ObstaculosGrupo = new Group();
    NubesGrupo = new Group();

    Restart = createSprite(300,100,20,20);
    Restart.addImage(RestartIMG);
    Restart.scale = 0.5;
    Restart.visible = false;
    GameOver = createSprite(300,60,20,20);
    GameOver.addImage(GameOverIMG);
    GameOver.visible = false;
} //Fin de Setup

function draw(){
    background("white");
    drawSprites();
    //console.log(Trex.y)

    textSize(15);
    text("Puntuacion " + Puntuacion, 450,15);
    Trex.collide(PisoInvisible);
    if(Piso.x < 0){
        Piso.x = Piso.width/2;
      } //Fin del if Piso

    if(gameState === PLAY){
      Puntuacion = Puntuacion + Math.round(frameCount/100)
        console.log("Antes del FrameCount", frameCount);
        Piso.velocityX = -2
        if(Puntuacion > 0 && Puntuacion % 100 === 0){
          console.log("Frame Count: ", frameCount);
          Sonido2MP3.play();
        }
        if(keyDown("space") && Trex.y >= 135){
        Trex.velocityY = -10;
        //Sonido1MP3.play();
        } //Fin del if Space
      Trex.velocityY = Trex.velocityY + 0.5;
      aparecerNubes();
      obstaculos();
        if(ObstaculosGrupo.isTouching(Trex)){ 
          Sonido3MP3.play();
          gameState = END;
        }
    }

    else if(gameState === END){
      Piso.velocityX = 0
      ObstaculosGrupo.setVelocityXEach(0);
      NubesGrupo.setVelocityXEach(0); 
      
      Trex.changeAnimation("TrexCollide", TrexCollide);
      ObstaculosGrupo.setLifetimeEach(-1);
      NubesGrupo.setLifetimeEach(-1);
      Restart.visible = true;
      GameOver.visible = true;
      Puntuacion = 0;  
    }
    if(mousePressedOver(Restart)){
      //console.log("Antes de BotonRestar")
        BotonRestart();
      //console.log("Despues de BotonRestart")
      }
} //Fin de Draw

function aparecerNubes(){
      if(frameCount%100 === 0){
        Nubes = createSprite(575,50,20,20);
        Nubes.velocityX = -4;
        Nubes.addAnimation("Nubes", NubesIMG);
        Nubes.y = Math.round(random(10, 110));
        Nubes.depth = Trex.depth;
        //Trex.depth = Trex.depth + 1;
        Trex.depth += 1;
        Nubes.lifetime = 170;
        NubesGrupo.add(Nubes);
    }    
    if(frameCount%200 === 0){
        NubesChiquitas = createSprite(475,50,20,20);
        NubesChiquitas.velocityX = -6;
        NubesChiquitas.addAnimation("NubesChiquitas", NubesChiquitasIMG);
        NubesChiquitas.scale = 0.6;
        NubesChiquitas.y = Math.round(random(30,90));
        NubesChiquitas.depth = Trex.depth;
        Trex.depth += 1;
        NubesChiquitas.lifetime = 170;
        NubesGrupo.add(NubesChiquitas);
    }
}

function obstaculos(){
      if(frameCount%100 === 0){
        Obstaculo1 = createSprite(600,155,10,10);
        Obstaculo1.velocityX = -4;
        var NumeroRandom;
        NumeroRandom = Math.round(random(1,6));
        //console.log(NumeroRandom);
        Obstaculo1.scale = 0.6;
        Obstaculo1.lifetime = 170; // Se cuentan lso milisegundos de vida del sprite para que no consuma datos de mas
        switch (NumeroRandom){
          case 1: Obstaculo1.addImage(Obstaculo1IMG);
          break;
          case 2: Obstaculo1.addImage(Obstaculo2IMG);
          break;
          case 3: Obstaculo1.addImage(Obstaculo3IMG);
          break;
          case 4: Obstaculo1.addImage(Obstaculo4IMG);
          break;
          case 5: Obstaculo1.addImage(Obstaculo5IMG);
          break;
          case 6: Obstaculo1.addImage(Obstaculo6IMG);
          break;
          default: break;
      } //Cuando se seleciona un numero del 1 al 6 el switch le da la instruccion a cada caso y el default es por seguridad 
        ObstaculosGrupo.add(Obstaculo1);
    }
}

function BotonRestart(){
  //console.log("En la funcion BotonRestart")
  gameState = PLAY
  GameOver.visible = false;
  Restart.visible = false;
  ObstaculosGrupo.destroyEach();
  NubesGrupo.destroyEach();
  Trex.changeAnimation("Running", TrexRunning);
  //console.log(gameState)
}