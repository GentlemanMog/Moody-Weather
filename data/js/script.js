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

      $('#btn-1').click(function(){
        $('#Geo').attr('src', 'resources/Geolocation_Button_light.png');
        $('#btn-1').attr('optacity', '1');
      });

}); 


    
	


