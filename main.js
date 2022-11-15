song1="";
song2 = "";
slw = 0
srw = 0
song_saus1 = ""
song_saus2 = ""
leftWristX = 0;
leftWristY = 0;
RightWristX = 0;
RightWristY = 0;
function preload() {
    Harry_potter_theme = loadSound("music.mp3");
    Peter_pan = loadSound("music2.mp3");
}


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded (){
    console.log('Posenet Is Initialized');

}
function gotPoses(results) {
    if(results.length > 0){
        console.log(results);
        
        srw = results[0].pose.keypoints[10].score;
        slw = results[0].pose.keypoints[9].score;


        console.log("scoreLeftWrist = " + slw);
        console.log("scoreRightWrist = " + srw);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    
       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY)
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#E0FFFF")
    stroke("#E0FFFF")

    song_saus1 = Harry_potter_theme.isPlaying()
    song_saus2 = Peter_pan.isPlaying()

    if(slw > 0.2) {
        circle(leftWristX, leftWristY, 20)
        Harry_potter_theme.stop()
        if(song_saus2 == false) {
            Peter_pan.play()
            document.getElementById('song').innerHTML="Song Name: Peter Pan"
       }
    }
    if(srw > 0.2) {
        circle(leftWristX, leftWristY, 20)
        Peter_pan.stop()
        if(song_saus1 == false) {
            Harry_potter_theme.play()
            document.getElementById('song').innerHTML="Song Name: Harry Potter Theme"
       } 
    } 

}
