
function init(){
  var itemCount = 0;
  var priceTotal = 0;

 // read our array of products and display it
  $.getJSON( "js/items.js", function( json ) {
     
       json.forEach(function (item) {
           $("#products").append('<div class="col-sm-4"><div class="card">' + 
            '<img class="card-img-top" src="' + item.image + '">' +
            '<div class="card-body">' + 
            '<h5 class="card-title">' + item.name + '</h5>' +
            '<p class="card-text price">' + "Price: $" + item.price + '</p>' + 
            '<p class="card-text price">' + item.description + '</p>' + 
            '<a href="#"  class="add btn btn-primary k-primary">Add to cart</a>' +
            '</div>' + 
            '</div></div>');
        });
    
  });
          
  $("#emptyCart").kendoButton();


    // Add Item to Cart
  $(document).on("click", ".add", function (){
    itemCount ++; 

    $('#emptyCart').css('display', 'inline');

    $('#itemCount').text(itemCount).css('display', 'block');
    $(this).siblings().clone().appendTo('#cartItems').append('<button class="removeItem">Remove Item</button>');

    // Calculate Total Price
    var price = parseInt($(this).siblings().find('.price').text()); 
    priceTotal += price;
    $('#cartTotal').text("Total: $" + priceTotal);
  }); 



  // Hide and Show Cart Items
  $(document).on('click', '.openCloseCart', function(){
    $('#shoppingCart').toggle();
  });


  // Empty Cart
  $(document).on('click', '#emptyCart', function() {
    itemCount = 0;
    priceTotal = 0;

    $('#itemCount').css('display', 'none');
    $('#cartItems').text('');
    $('#cartTotal').text("Total: $" + priceTotal);
  }); 



  // Remove Item From Cart
  $('#shoppingCart').on('click', '.removeItem', function(){
    $(this).parent().remove();  
    itemCount --;
    $('#itemCount').text(itemCount);

    // Remove Cost of Deleted Item from Total Price
    var price = parseInt($(this).siblings().find('.price').text());
    priceTotal -= price;
    $('#cartTotal').text("Total: €" + priceTotal);

    if (itemCount == 0) {
      $('#itemCount').css('display', 'none');
    }
  });

}

$(init);
