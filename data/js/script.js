$(document).ready(function(){
	  var firstChild = $("#base li:first-child").clone(),
          lastChild  = $("#base li:last-child").clone(),
          container  = $("#base");
		  slider = $("slider");

      firstChild.appendTo(container);
      lastChild.prependTo(container);

      container.dragend({
        jumpToPage: 2,
        onSwipeEnd: function() {
          var first = this.pages[0],
              last = this.pages[this.pages.length - 1];

          if (first === this.activeElement) {
            this.jumpToPage(this.pages.length - 1 );
          }

          if (last === this.activeElement) {
            this.jumpToPage(2);
          }

        },
        afterInitialize: function() {
          this.container.style.visibility = "visible";
        }
      });

      $('#btn-2').click(function(){
        $('#fav').attr('src', 'resources/Star_Button_light.png');
        $('#btn-2').attr('optacity', '1');
      });

      
      $("#favs").change(function() {

  var $dropdown = $(this);

  $.getJSON("data/js/set.json", function(data) {
  
    var key = $dropdown.val();
    var vals = [];
              
    switch(key) {
      case 'places':
        vals = data.places.split(",");
        break;
      case 'overseas':
        vals = data.overseas.split(",");
        break;
      case 'base':
        vals = ['Chosen Region'];
    }
    
    var $set = $("#sets");
    $set.empty();
    $.each(vals, function(index, value) {
      $set.append("<option>" + value + "</option>");
    }); 

      });
    });

}); 


    
	


