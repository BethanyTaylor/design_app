window.onload = function getImages(){
	var imageSearch = new XMLHttpRequest();
	imageSearch.onreadystatechange = function() {
		if(imageSearch.readyState == 4 && imageSearch.status==200) {
			var images = imageSearch.responseText;
			var allImages = JSON.parse(images);
			console.log("images are awesome");
		};
     };
  imageSearch.open("GET", "http://api.bing.net/xml.aspx?AppId=Insert your AppId here&Query=xbox%20site:microsoft.com&Sources=Image&Version=2.0&Market=en-us&Adult=Moderate&Image.Count=10&Image.Offset=0", true);
  imageSearch.send();
}