// Derrick Henry
// ARTG 5330 VISUALIZATION TECHNOLOGIES 1
// FALL 2017 SEC 03 399A RY
// ASSIGNMENT 1

//initializes a variable called particleSystem to an empty array
var particleSystem = [];

// This function is called when the page loads (standard in p5.js).  It sets
// up the visualization.
function setup(){

    // Defines the canvas variable and initializes it with p5's createCanvas
    // function using the p5's environment variables for window  height and
    // width to make the canvas take up the entire window.
    var canvas = createCanvas(windowWidth, windowHeight);

    // Sets the rate at which the draw function is called.
    frameRate(30);

    // Sets the color mode to be used on the canvas.  In this case HSB (hue
    // saturation and brightness).  The scales to use is also set here.
    // 360 is the highest value in the range for hue.
    // Saturation, brightness and alpha all have a max value of 100.
    colorMode(HSB, 360, 100, 100, 100);

}

// This function is called in evenly spaced intervals based on the frameRate.
// So, in this case, it is called 30 times a second, repainting the canvas each
// time to create apparent motion (assuming the scene changes, otherwise, The
// same image will be redrawn).
function draw(){

    // set the background of the canvas to be value 0 (black)
    background(0);

    // Set the blendMode, or the way that colors interact when layered to be
    // screen (uses the inverse values of stacked colors).
    blendMode(SCREEN);

    // Loop through the particleSystem array, starting with the last element,
    // and working backwards to the first.
    for(var i=particleSystem.length-1; i>=0; i--){

        // define the p variable to be the current particle (based on the
        // index of the loop).
        var p = particleSystem[i];

        // check if the particle is still alive based on its lifespan attribute
        if(p.areYouDeadYet()){
            // if the particle should be dead, remove it from the particleSystem
            // array. (the first argument sets the position to be removed. The
            // second sets how many items to remove).
            particleSystem.splice(i, 1);
        }else{

            // If it should not be dead, call the update and draw functions for
            // the particle.
            p.update();
            p.draw();
        }
    }
}

// This function is called if the user resizes their window.
function windowResized(){
    // resizes the canvas using p5's environment variables for window  height
    // and width.
    resizeCanvas(windowWidth, windowHeight);

}

// Initialize a variable.  The Particle variable is now a function that
// acts as a contructor for new particles.  Position, velocity and hue are
// passed to the function.
var Particle = function(position, velocity, hue){
    // Sets this particle's position to the position argument.
    this.position = position.copy();
    // Sets this particle's velocity to the velocity argument.
    this.velocity = velocity.copy();
    // Sets this particle's size to 10 pixels.
    this.size = 10;
    // Sets this particle's lifeSpan to a value between 20 and 100.
    this.lifeSpan = random(20, 100);
    // Sets this particle's hue to a random value between 15 below and 15 above
    // the hue argument's value.
    this.hue = random(hue-15, hue+15);

    // creates a function that is used so that a particle can update itself.
    this.update = function(){
        // Decrease the particle's lifespan by 1.
        this.lifeSpan--;
        // Change the particle's position by the passed velocity.
        this.position.add(velocity);

    }

    // Creates a function that is used that the particle can be drawn.
    this.draw = function(){
        // Makes the shape have no outline.
        noStroke();

        // sets the fill of the shape to be the color provided by hue, and sets
        // the saturation and brightness to 100 (the max based on what we set
        // in our setup function)
        fill(this.hue, 100, 100);

        // creates an ellipse (in this case a circle) with the attributes
        // defined for this particle (in the draw/update and those sets
        // when the Particle was created)
        ellipse(this.position.x,
                this.position.y,
                this.size,
                this.size);

    }

    // Creates a function that checks if the given particle should be dead
    // or not.
    this.areYouDeadYet = function(){

        // Returns true if the particle's lifespan attribute is less than or
        // equal to zero (i.e. it is dead), false otherwise.
        return this.lifeSpan <= 0;
    }
}

// A function to create the set of particles
function createMightyParticles(){
    // Set the base hue to a value between 20 and 300.
    var hue = random(20, 300);

    // Perform the code that follows 200 times. (loop through values 0 - 199).
    for(var i=0; i<200; i++){

        // sets a point in 2d space based on the current mouse position
        // (x and y position).
        var pos = createVector(mouseX, mouseY);

        // create another 2d point to be used to x and y velocity.
        var vel = createVector(0,1);

        // rotate this velocity point by a random number of radians between 0
        // and two times pi (this will allow for the circular fireworks spread)
        vel.rotate(random(0, TWO_PI));
        // Multiply the velocity by a random value between 1 and 10 to amplify
        // the effect.
        vel.mult(random(1, 10));

        // Create a new particle based on the previously set position, velocity
        // and base hue.
        var newBorn = new Particle(pos, vel, hue);

        // Add the new particle to the particleSystem array.
        particleSystem.push(newBorn);

    }

}

// A function that is called when the mouse is clicked.
function mouseClicked(){
    //we will create a mighty system of particles here
    createMightyParticles();

}
