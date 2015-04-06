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
    var results = document.getElementById("results");
    for (var i = 0; i < data.items.length; i++) {
        var img = document.createElement("img");
        img.src = data.items[i].media.m;
        results.appendChild(img);
    }
}

document.getElementById('search').addEventListener('click', function(){
    var search = document.getElementById("searchterm").value;

    // Remove the old script
    var old = document.getElementById('flickr_script');
    if (old) {
        document.body.removeChild(old);
    }

    // Remove the old images
    var imgs = document.querySelectorAll("#results img");
    var results = document.getElementById("results");
    for (var i = 0; i < imgs.length; i++) {
        results.removeChild(imgs[i]);
    }

    var script = document.createElement('script');
    script.id = "flickr_script";
    script.type = 'text/javascript';
    script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&tagmode=any&jsoncallback=my_callback&tags='+search;
    document.body.appendChild(script);

});