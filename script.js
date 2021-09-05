/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */

 


  let cursors;
  let player;
  let showDebug = false;
  

this.scene.start()

  function preload() {
    this.load.image("tiles", "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/tuxmon-sample-32px-extruded.png", "https://raw.githubusercontent.com/TechnoSoldier/phaser-3-tilemap-blog-posts/master/examples/post-1/assets/tilesets/mounatin.png");
    this.load.tilemapTiledJSON("map", "https://raw.githubusercontent.com/TechnoSoldier/phaser-3-tilemap-blog-posts/master/examples/post-1/assets/tilemaps/tuxemon-town.json");
    this.load.image("enemy", "https://raw.githubusercontent.com/TechnoSoldier/phaser-3-tilemap-blog-posts/master/Images/aebda95b2beaecc.png");
    this.load.image("chatbox", "https://raw.githubusercontent.com/TechnoSoldier/phaser-3-tilemap-blog-posts/master/Images/chat_icon.png");
    this.load.image("Bg", "https://raw.githubusercontent.com/TechnoSoldier/phaser-3-tilemap-blog-posts/master/Images/360_F_339164168_EHlFVZnP5n4BCh4huPeILoPyD0LEhWzl.png")
    this.load.image("title", "https://raw.githubusercontent.com/TechnoSoldier/phaser-3-tilemap-blog-posts/master/Images/87fb4aa830e4a67d5d73d6976d17981d.png")
    
    // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
    // the player animations (walking left, walking right, etc.) in one image. For more info see:
    //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
    // If you don't use an atlas, you can do the same thing with a spritesheet, see:
    //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
    this.load.atlas("atlas", "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png", "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json");
    this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    this.load.image("play", "https://raw.githubusercontent.com/TechnoSoldier/phaser-3-tilemap-blog-posts/master/Images/e70c2466d19f47cbc6adc78930d89b3a.png")
    this.load.image("bird", "https://raw.githubusercontent.com/TechnoSoldier/phaser-3-tilemap-blog-posts/master/Images/ULiPg5p.png")
  }
  


  var isGameOver = false

  function create() {
    const map = this.make.tilemap({ key: "map" });
  

    
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
  
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);
  
    worldLayer.setCollisionByProperty({ collides: true });
  
    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    aboveLayer.setDepth(10);
  
    // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
    // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    
  
    // Create a sprite with physics enabled via the physics system. The image used for the sprite has
    // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
    player = this.physics.add
      .sprite(spawnPoint.x,spawnPoint.y, "atlas", "misa-front")
      .setSize(30, 40)
      .setOffset(0, 24)
      .setDepth(20);

    Bg = this.physics.add
        .sprite(398, 1650, "Bg")
        .setDepth(1000000)
        .setScale(1.84);

    title = this.physics.add
         .sprite(398, 1570, "title")
        .setDepth(1000001)
        .setScale(1);

    play = this.physics.add
    .sprite(398, 1770, "play")
    .setDepth(1000002)
    .setScale(1);
    play.setInteractive();

    play.on('pointerdown', function(pointer){
        Bg.destroy()
        play.destroy()
        title.destroy()
        camera.fadeOut(100)
        camera.fadeIn(3000)
    }
    )


    
   


obstacle = this.physics.add.sprite(580, 1768, "enemy")
obstacle.setScale(.14)
obstacle.setVisible(false)

egg = this.physics.add.sprite(145, 155, "enemy")
egg.setScale(.14)
egg.setVisible(false)


enemy = this.physics.add
      .sprite(398, 1768, "enemy")
      .setScale(.14)
      .setOffset(0, 24);
    enemy.depth = 1;
    console.log(enemy);
    enemy.setInteractive();


    chatbox = this.physics.add
      .sprite(985, 883, "chatbox")
      .setScale(.3)
      .setOffset(0, 24)
      .setDepth(400);
    chatbox.depth = 400;
    chatbox.setInteractive();

    chatbox1 = this.physics.add
        .sprite(415, 1735, "chatbox")
        .setScale(.3)
        .setOffset(0,24)
        .setDepth(400);
    chatbox.depth = 400;
    chatbox.setInteractive();
    

    enemy.on('pointerdown', function(pointer){
        console.log('click')
        console.log(pointer)
        npc1.setVisible(true) 
        

    });

    enemy1 = this.physics.add
      .sprite(977, 923, "enemy")
      .setScale(.14)
      .setOffset(0, 24);
    enemy1.depth = 1;
    console.log(enemy1);
    enemy1.setInteractive();
    enemy1.setVisible(false)

    this.physics.add.collider(enemy, obstacle, function (enemy, obstacle) {
        if (!isGameOver) {
                enemy.setVelocityX(0)
                obstacle.destroy()
        }
    });

    this.physics.add.collider(egg, player, function (egg, player) {
        if (!isGameOver) {
                camera.fadeOut(500)
                
        }
    });

 




    

  
    // Watch the player and worldLayer for collisions, for the duration of the scene:
    this.physics.add.collider(player, worldLayer);
  
    // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.
    const anims = this.anims;
    anims.create({
      key: "misa-left-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-right-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-front-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-back-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });
  
    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

   
	// previous code...

	this.input.keyboard.once('keydown-SPACE', () => {
		// fade to black
		fadeout = this.cameras.main.fadeOut(300, 0, 0, 0)
        this.cameras.main.fadeIn(1000, 0, 0, 0)
	})

    cursors = this.input.keyboard.createCursorKeys();
  
    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0)
      .setDepth(30)
      .setVisible(true);

    npc1 = this.add
    .text(16, 556, 'Welcome to Your Adventure! Lets meet in the plaza <next>', {
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff",
      border: "solid #000000"

    })
    
    .setScrollFactor(0)
    .setDepth(30)
    .setVisible(false)
    .setInteractive();

    

    
    npc1.on('pointerdown', function(fade){
        console.log('click')
        camera.fadeOut(1)
        camera.fadeIn(3000)
        npc1.destroy()
        enemy.destroy()
        enemy1.setVisible(true)
        chatbox1.destroy()
        

    });  
  
    // Debug graphics
    this.input.keyboard.once("keydown-D", event => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();
  
      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add
        .graphics()
        .setAlpha(0.75)
        .setDepth(20);
      worldLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    });
  }
  



  function update(time, delta) {
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();
  

    // Stop any previous movement from the last frame
    player.body.setVelocity(0);
  
    // Horizontal movement
    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
    }
  
    // Vertical movement
    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
    }
  
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    //player.body.velocity.normalize().scale(speed);
  
    // Update the animation last and give left/right animations precedence over up/down animations
    if (cursors.left.isDown) {
      player.anims.play("misa-left-walk", true);
    } else if (cursors.right.isDown) {
      player.anims.play("misa-right-walk", true);
    } else if (cursors.up.isDown) {
      player.anims.play("misa-back-walk", true);
    } else if (cursors.down.isDown) {
      player.anims.play("misa-front-walk", true);
    } else {
      player.anims.stop();
  
      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
      else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
      else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
      else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
    }
    {
        
    
    }
  }
  

