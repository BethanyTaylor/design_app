// window.onload = function getImages(){
// 	var imageSearch = new XMLHttpRequest();
// 	imageSearch.onreadystatechange = function() {
// 		if(imageSearch.readyState == 4 && imageSearch.status==200) {
// 			var images = imageSearch.responseText;
// 			var allImages = JSON.parse(images);
// 			console.log("images are awesome");
// 		};
//      };
//   imageSearch.open("GET", "http://api.bing.net/xml.aspx?AppId=Insert your AppId here&Query=xbox%20site:microsoft.com&Sources=Image&Version=2.0&Market=en-us&Adult=Moderate&Image.Count=10&Image.Offset=0", true);
//   imageSearch.send();
// }

function my_callback(data){

    if (typeof data !== 'undefined'){
        localStorage.searchResults = JSON.stringify(data);
    } else{
        if (localStorage.hasOwnProperty("searchResults")) {
            data = JSON.parse(localStorage.searchResults);
        } else {
            search();
            return;
        }

    }

    var results = document.getElementById("results");
    for (var i = 0; i < data.items.length; i++) {
        var img = document.createElement("img");
        img.src = data.items[i].media.m;
        results.appendChild(img);
        (function(image){
            setTimeout(function() {
                //var img = document.querySelectorAll('#results img');
                image.className += ' flatten';
            }, 0);
        })(img);
    }
}

function search(){
    console.log("search called");
    var search = document.getElementById("search_term").value;

    // Remove the old script
    var old = document.getElementById('flickr_script');
    if (old) {
        document.body.removeChild(old);
    }

    removeImages();

    var script = document.createElement('script');
    script.id = "flickr_script";
    script.type = 'text/javascript';
    script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&tagmode=any&jsoncallback=my_callback&tags='+search;
    document.body.appendChild(script);

    hideSearchBar();

}

function removeImages(){
    // Remove the old images
    var imgs = document.querySelectorAll("#results img");
    var results = document.getElementById("results");
    for (var i = 0; i < imgs.length; i++) {
        results.removeChild(imgs[i]);
        //imgs[i].className = '';
    }
}

window.onload = function(){
    my_callback();
}

var onlongtouch; 
var timer;
var touchduration = 1000; //length of time we want the user to touch before we do something

//hide the search icon
document.getElementById('search_icon').addEventListener('touchstart', function(event){
    timer = setTimeout(onlongtouch, touchduration);
    setTimeout(function(){
        showSearchBar();
    }, 300 );
});

document.getElementById('search_icon').addEventListener('touchend', function(event){
    if (timer) {
        clearTimeout(timer); // clearTimeout, not cleartimeout..
    }
});

var onlongtouch = function() {
    var cam = document.getElementById("camera");
    if (cam.style.display == "block"){
        go(true);
        cam.style.display = "none";
    } else {
        go();
        cam.style.display = "block";
    }
 };



//show search bar
function showSearchBar(){
    document.getElementById('search_tap').play();
    document.getElementById('search_icon').style.right = "-5em";
    document.getElementById('search_form').style.left = "1em";
    document.getElementById('search_term').style.width = "73%";
    var rotate = document.getElementById("search_button");
    rotate.classList.add('rotate');
}

//hide the search bar and show the original search icon
function hideSearchBar(){
    document.getElementById('anywhere_tap').play();
    document.getElementById('search_form').style.left = "-100em";
    document.getElementById('search_icon').style.right = "1em";
    document.getElementById('search_term').style.width = "0%";
    document.getElementById('search_term').value = '';
    var rotate = document.getElementById("search_button");
    rotate.classList.remove('rotate');
}



//-----------Camera Functions-----------------------------
// Put event listeners into place
    function go(stop){
        // Grab elements, create settings, etc.
        var canvas = document.getElementById("canvas"),
            context = canvas.getContext("2d"),
            video = document.getElementById("video"),
            videoObj = { "video": true },
            errBack = function(error) {
                console.log("Video capture error: ", error.code); 
            };
        


        // Put video listeners into place
        if(navigator.getUserMedia) { // Standard
            navigator.getUserMedia(videoObj, function(stream) {
                video.src = stream;
                if (typeof stop !== 'undefined' && stop) {
                    stream.stop();
                    video.pause();
                } else {
                    video.play();
                }
            }, errBack);
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(videoObj, function(stream){
                video.src = window.URL.createObjectURL(stream);
                if (typeof stop !== 'undefined' && stop) {
                    stream.stop();
                    video.pause();
                } else {
                    video.play();
                }
            }, errBack);
        }
        else if(navigator.mozGetUserMedia) { // Firefox-prefixed
            navigator.mozGetUserMedia(videoObj, function(stream){
                video.src = window.URL.createObjectURL(stream);
                if (typeof stop !== 'undefined' && stop) {
                    stream.stop();
                    video.pause();
                } else {
                    video.play();
                }
            }, errBack);
        }
        // Trigger photo take
        document.getElementById("snap").addEventListener("click", function() {
            canvas.style.height = video.offsetWidth/1.333+"px";
            context.drawImage(video, 0, 0, video.offsetWidth, video.offsetWidth/1.333);

        });


    }





