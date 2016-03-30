var Map = function( latlng, zoom ) {     
  this.googleMap = new google.maps.Map( document.getElementById('map'), {  
     center: latlng,
     zoom: zoom
  });

var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
this.addMarker = function(latlng) {
  var marker = new google.maps.Marker({
    position: latlng, 
    map: this.googleMap,
    icon: image,
    draggable: true,    
    animation: google.maps.Animation.DROP,
    // label: label   // pass in a string
    // title: title    
   });
   return marker;    
} 
}