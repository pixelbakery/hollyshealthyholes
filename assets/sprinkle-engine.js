// This code simply clones the star element and randomly places it on the page.

$.fn.multiply = function (numCopies) {
  var newElements = this.clone();
  for (var i = 1; i < numCopies; i++) {
    newElements = newElements.add(this.clone());
  }
  return newElements;
};
var sprinkleNum = setSprinkleNum();
$(".sprinkle-holder").multiply(sprinkleNum).insertAfter(".sprinkle-holder");

$(".sprinkle-holder").each(function () {
  var screenMin = -25;
  var screenMax = 125;
  var top = randomNum(screenMin, screenMax) + "%";
  var left = randomNum(screenMin, screenMax) + "%";
  var initRotation = randomNum(0, 360);

  //  Define size of sprinkles
  var Sprinklewidth = setSprinkleLength();
  var Sprinkleheight = Sprinklewidth / 2.75;

  var borderRadius = Sprinkleheight / 2;

  //initial load variables
  var initialLoadDelay = randomNum(0, 1) + "s";
  var initialLoadTime = ".66s";
  var loadThatShit =
    "pop-on-in " +
    initialLoadTime +
    " " +
    initialLoadDelay +
    " 1 ease-in-out normal forwards";

  //   offset the timing
  var delayMin = -5;
  var delayMax = 2;
  var delay = randomNum(delayMin, delayMax) + "s";

  //   Offset the duration
  var durationMin = 3;
  var durationMax = 10;
  var duration = randomNum(durationMin, durationMax) + "s";
  var bopThatShit =
    "floating " + duration + " ease-in-out " + delay + " infinite" + " normal";

  //   Full Orbit Time
  var fullOrbitMin = 0.1;
  var fullOrbitMax = 20;
  var orbitTime = randomNum(fullOrbitMin, fullOrbitMax) + "s";
  var orbitMinDelay = -6;
  var orbitMaxDelay = 0;
  var orbitDelay = randomNum(orbitMinDelay, orbitMaxDelay) + "s";
  var orbitDirection = getOrbitDirection();
  var spinThatShit =
    orbitDirection + " " + orbitTime + " linear " + orbitDelay + " infinite ";

  var assignedColor = determineColor();

  var animateThatShit = loadThatShit + ", " + spinThatShit;

  //   replace CSS variables
  $(this).css({
    transform: "rotate(" + initRotation + "deg)",
    top: top,
    animation: bopThatShit,
    left: left
  });
  $(this)
    .find(".sprinkle")
    .css({
      height: Sprinkleheight,
      width: Sprinklewidth + "px",
      "border-radius": borderRadius,
      animation: loadThatShit,
      "background-color": assignedColor
    });
});

// Figure out what color the sprinkle will be
function determineColor() {
  //   set the colors
  var colorLightYellow = "#FBE99E";
  var colorLightPink = "#F7BAC0";
  var colorForestGreen = "#526851";
  var colorLightGreen = "#78A077";
  var colorDarkBlue = "#464654";
  var colorBurntYellow = "#FFBC00";
  var colorBrown = "#774D4B";
  var colorDarkPink = "#FA9295";

  //   load the colors into an array
  var colorArray = new Array();
  colorArray.push(colorLightYellow);
  colorArray.push(colorLightPink);
  colorArray.push(colorForestGreen);
  colorArray.push(colorLightGreen);
  colorArray.push(colorDarkBlue);
  colorArray.push(colorBurntYellow);
  colorArray.push(colorBrown);
  // colorArray.push(colorDarkPink);

  //   pick a random object out of the array and assign the color to that
  var assignedColor = colorArray[Math.floor(Math.random() * colorArray.length)];

  // console.log(JSON.parse(JSON.stringify(assignedColor)));
  return assignedColor;
}
function randomNum(min, max) {
  var getNum = Math.random() * (+max - +min) + +min;
  var n = (getNum * 1).toFixed(3);
  return n;
}

function getOrbitDirection() {
  var y = Math.random();
  if (y < 0.5) {
    return "orbit";
  } else {
    return "orbit-reverse";
  }
}

function getScreenWidth() {
  var screenWidth = $(document).width();
  var screenSize;

  if (screenWidth > 1200) {
    screenSize = "XL";
  } else if (screenWidth > 991) {
    screenSize = "LG";
  } else if (screenWidth > 768) {
    screenSize = "MD";
  } else if (screenWidth > 575) {
    screenSize = "SM";
  } else {
    screenSize = "XS";
  }
  return screenSize;
}
function setSprinkleNum() {
  var screenSize = getScreenWidth();
  var sprinkleNum;
  if (screenSize == "XL") {
    sprinkleNum = 120;
  } else if (screenSize == "LG") {
    sprinkleNum = 60;
  } else if (screenSize == "MD") {
    sprinkleNum = 45;
  } else if (screenSize == "SM") {
    sprinkleNum = 30;
  } else if (screenSize == "XS") {
    sprinkleNum = 22;
  }
  // console.log(JSON.parse(JSON.stringify(sprinkleNum)));
  return sprinkleNum;
}

function setSprinkleLength() {
  var screenSize = getScreenWidth();
  var sprinkleLength;
  if (screenSize == "XL") {
    sprinkleLength = 45;
  } else if (screenSize == "LG") {
    sprinkleLength = 34;
  } else if (screenSize == "MD") {
    sprinkleLength = 28;
  } else if (screenSize == "SM") {
    sprinkleLength = 22;
  } else if (screenSize == "XS") {
    sprinkleLength = 15;
  }
  // console.log(JSON.parse(JSON.stringify(sprinkleLength)));
  return sprinkleLength;
}
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml16');
if (textWrapper){
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml16 .letter',
    translateY: [-100,0],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => 30 * i
  });
}