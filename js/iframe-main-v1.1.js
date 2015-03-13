// redirect if not viewed in iframe /commented out for testing/
//if(self.location==top.location)
//  top.location.replace('http://watchaware.com');

// stop loading indicator

$(window).load(function(){
  $('.js-load').removeClass('loading')
});
