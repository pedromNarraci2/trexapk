var Rex, TrexRunner;
var ground;
var groundimg;
var chaoinvisivel;
var cloud, cloudimg
var cacto, cactoImg1, cactoImg2, cactoimg3, cactoimg4, cactoimg5, cactoimg6;
var record = 0
var score = 0
var play = 1
var end = 0
var gameState = play
var cactogp,cloudgp
var trexcolaide
var gameover,gameoverimg
var restart,restartimg
var jumpsound, deathsound, pointsound


//preload carrega as midías do jogo 
function preload() {
  TrexRunner = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundimg = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png")
  trexcolaide=loadAnimation("trex_collided.png")
  gameoverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
  jumpsound=loadSound("jump.mp3")
  deathsound=loadSound("die.mp3")
  pointsound=loadSound("checkpoint.mp3")

}
//setup faz a aconfiguração
function setup() {
  createCanvas(windowWidth,windowHeight);
  // criando as bordas

  Rex = createSprite(50, height-40, 20, 50)
  Rex.addAnimation("runner", TrexRunner);
  Rex.addAnimation("collided",trexcolaide)
  Rex.scale = 0.5;
  Rex.debug=false
  //Rex.setCollider("rectangle",0,0,100,80);
  Rex.setCollider("circle",-5,15,30)
  

  ground = createSprite(width/2, height-30, width, 2);
  ground.addImage("ground", groundimg);
  chaoinvisivel = createSprite(width/2, height-10, width, 2)
  chaoinvisivel.visible = false
  cactoImg1 = loadImage("obstacle1.png")
  cactoImg2 = loadImage("obstacle2.png")
  cactoImg3 = loadImage("obstacle3.png")
  cactoImg4 = loadImage("obstacle4.png")
  cactoImg5 = loadImage("obstacle5.png")
  cactoImg6 = loadImage("obstacle6.png")

  cactogp=createGroup ()
  cloudgp=createGroup ()
  gameover = createSprite(width/2,height-120)
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;

 restart = createSprite(width/2,height-120);
 restart.addImage(restartimg);
 restart.scale = 0.5;

 gameover.visible=false;
  restart.visible=false;
  var mensagem="trex"
  console.log(mensagem)
  



}
//draw faz o movimento, a ação do jogo
function draw() {
  background("#f0f9f");

  textSize(18);
  fill("black");
  text("score: " + score, width-150, height-120);
  text("record: " + record, width-150, height-100);



  if (gameState == play) {
    score += Math.round(getFrameRate()/60)
    if (score>0&&score%100==0){ 
      pointsound.play()

    }
    ground.velocityX = -(4+3*score/100);
    if (ground.x < 800) {
      ground.x = ground.width / 2
    }
    if (touches.length>0||keyDown("space") && Rex.y > height-40) {
      Rex.velocityY = -11;
      jumpsound.play()
      touches=[]
    }
    createCloud()
    createCacto();


  }

  if (Rex.isTouching(cactogp)){
    gameState=end
    //deathsound.play()
  }

  if (gameState == end) {
    Rex.changeAnimation("collided",trexcolaide);
    ground.velocityX=0
    
    cloudgp.setVelocityXEach(0);
    cactogp.setVelocityXEach(0);
    cloudgp.setLifetimeEach(-1);
    cactogp.setLifetimeEach(-1);

    gameover.visible=true;
    restart.visible=true;
    if (record<score) {
      record=score
    }
    if (mousePressedOver(restart)) {
      gameState=play
      gameover.visible=false
      restart.visible=false
      cactogp.destroyEach()
      cloudgp.destroyEach()
      Rex.changeAnimation("runner", TrexRunner);
      score=0
    }
  }




  Rex.velocityY = Rex.velocityY + 0.5;





  Rex.collide(chaoinvisivel)




  //coordenadas do mouse na tela
  text("X: " + mouseX + "/ Y: " + mouseY, mouseX, mouseY);
  drawSprites();

}

function createCloud() {
  if (frameCount % 60 == 0) {
    cloud = createSprite(width, random(height-190, height-100), 40, 10)
    cloud.velocityX = -(4+score/100);
    cloud.addImage(cloudimg)
    cloud.scale = random(0.4, 1.4);
    cloud.depth = Rex.depth - 1;
    cloud.lifetime = width/cloud.velocityX;
    cloudgp.add(cloud);

  }


}
function createCacto() {
  if (frameCount % 60 === 0) {
    cacto = createSprite(width, height-30, 40, 10);
    cacto.velocityX = -(4+score/100);
    cacto.lifetime = width/cacto.velocityX;
    cactogp.add(cacto);
    cacto.scale = 0.5;

    var sorte = Math.round(random(1, 6))
    switch (sorte) {
      case 1: cacto.addImage(cactoImg1)
        break;

      case 2: cacto.addImage(cactoImg2)
        break;

      case 3: cacto.addImage(cactoImg3)
        break;

      case 4: cacto.addImage(cactoImg4)
        break;

      case 5: cacto.addImage(cactoImg5)
        break;

      case 6: cacto.addImage(cactoImg6)

        break

    }
  }
}

