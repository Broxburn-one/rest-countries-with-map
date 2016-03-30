var Map = function( latlng, zoom ) {     
  this.googleMap = new google.maps.Map( document.getElementById('map'), {  
     center: latlng,
     zoom: zoom
  });

var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
this.addMarker = function(latlng, title) {
  //console.log(info);
  var marker = new google.maps.Marker({
    position: latlng, 
    map: this.googleMap,
    icon: image,
    draggable: true,    
    animation: google.maps.Animation.DROP,
     //label: "2"   // pass in a string
    title: title   
   });
   return marker 
  } 

  this.bindClick = function(){
    google.maps.event.addListener( this.googleMap, 'click', function(userClick){ 
    console.log(userClick.latLng.lat());  
      this.addMarker({lat: userClick.latLng.lat(), lng: userClick.latLng.lng()})
    }.bind(this))    
  }

  this.addInfoWindow = function(latlng, title) {
    //console.log(info);
    var marker = this.addMarker( latlng, title);
    marker.addListener('click', function(){   
      var infoWindow = new google.maps.InfoWindow({
        content: this.title
      });
      infoWindow.open(this.map, marker) ;   
    });
  }


}

