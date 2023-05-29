$(document).ready(function() {
  var selectedCakes = []; // Array to store selected cake details

  // Fetch cake data from the JSON file
  $.getJSON('cakes.json', function(data) {
    var specialsContainer = $('#specials-container');
    var menuContainer = $('#menu-container');

    // Add event listener to "Add to Cart" buttons
    specialsContainer.on('click', '.add-to-cart', addToCart);
    menuContainer.on('click', '.add-to-cart', addToCart);

    // Add event listener to "Buy Now" buttons
    specialsContainer.on('click', '.buy-now', buyNow);
    menuContainer.on('click', '.buy-now', buyNow);

    // Render the specials
    $.each(data.specials, function(index, item) {
      var cakeItem = $('<div class="item"></div>');
      cakeItem.append('<img src="' + item.image + '" alt="' + item.name + '" id="sm">');
      cakeItem.append('<h3 id="font"  >' + item.name + '</h3>');
      cakeItem.append('<p id="font" > Price:₹' + item.price + '</p><br>');
      cakeItem.append('<button type="button" class="add-to-cart" id="at"><img src="asset\\images\\ct1.png" height="30px" width="30px"></button>');
      cakeItem.append('<button type="button" class="buy-now" id="bn"><img src="asset\\images\\bn.png" height="40px" width="40px"></button>');
      specialsContainer.append(cakeItem);
    });

    // Render the menu items
    $.each(data.menu, function(index, item) {
      var cakeItem = $('<div class="item"></div>');
      cakeItem.append('<img src="' + item.image + '" alt="' + item.name + '" id="sm">');
      cakeItem.append('<h3 id="font" >' + item.name + '</h3>');
      cakeItem.append('<p id="font" >Price:₹  ' + item.price + '</p>');
      cakeItem.append('<button type="button" class="add-to-cart" id="at"><img src="asset\\images\\ct1.png" height="30px" width="30px"></button>');
      cakeItem.append('<button type="button" class="buy-now" id="bn"><img src="asset\\images\\bn.png" height="40px" width="40px"></button>');
      menuContainer.append(cakeItem);
    });

    function addToCart(event) {
      event.preventDefault();

      // Retrieve cake details
      var cakeItem = $(this).closest('.item');
      var cakeName = cakeItem.find('h3').text();
      var cakePrice = parseFloat(cakeItem.find('p').text().split('₹')[1]);
      var cakeImage = cakeItem.find('img').attr('src');

      // Store the cake details in the selectedCakes array
      selectedCakes.push({
        image: cakeImage,
        name: cakeName,
        price: cakePrice
      });

      // Display success message
      alert('Cake added to cart: ' + cakeName);

      // Update the cartItems.json file with the selectedCakes array
      updateCartJSON();
    }

    function buyNow(event) {
      event.preventDefault();

      // Retrieve cake details
      var cakeItem = $(this).closest('.item');
      var cakeName = cakeItem.find('h3').text();
      var cakePrice = parseFloat(cakeItem.find('p').text().split('₹')[1]);
      var cakeImage = cakeItem.find('img').attr('src');

      // Store the cake details in the selectedCakes array
      selectedCakes.push({
        image: cakeImage,
        name: cakeName,
        price: cakePrice
      });

      // Display success message
      alert('Cake added to order: ' + cakeName);

      // Update the orders.json file with the selectedCakes array
      updateOrderJSON();
    }

    function updateCartJSON() {
      var cartData = { cartItems: selectedCakes };

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/cartItems');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          alert('Selected cakes stored in cartItems.json');
        }
      };
      xhr.send(JSON.stringify(cartData));
    }

    function updateOrderJSON() {
      var orderData = { orderItems: selectedCakes };

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/order');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          alert('Selected cakes stored in orders.json');
        }
      };
      xhr.send(JSON.stringify(orderData));
    }
  });
});

// Open login form
function openLoginForm() {
  $('#login-modal').css('display', 'block');
}

// Close login form
function closeLoginForm() {
  $('#login-modal').css('display', 'none');
}

// Open register form
function openRegisterForm() {
  $('#register-modal').css('display', 'block');
}

// Close register form
function closeRegisterForm() {
  $('#register-modal').css('display', 'none');
}

// Open cart modal
function openCart() {
  $('#cart-modal').css('display', 'block');
}

// Close cart modal
function closeCart() {
  $('#cart-modal').css('display', 'none');
}



$(document).ready(function () {
  $('#register-form').validate({
    rules: {
      name1: 'required',
      email1: {
        required: true,
        email1: true
      },
      username1: 'required',
      password1: 'required'
    },
    messages: {
      name1: 'Please enter your name.',
      email1: {
        required: 'Please enter your email.',
        email1: 'Please enter a valid email address.'
      },
      username1: 'Please enter a username.',
      password1: 'Please enter a password.'
    },
    submitHandler: function (form) {
      // Show the SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Thank you for registering!',
        onClose: function () {

          form.submit(); // Submit the form after the alert is closed
        }
      });
    }
  });
});



$(document).ready(function () {
  $('#login-form').validate({
    rules: {
      username: 'required',
      password: 'required'
    },
    messages: {
      username: 'Please enter your username',
      password: 'Please enter your password'
    },
    submitHandler: function (form) {
      // Simulate login functionality (replace with your own login logic)
      var username = $('#username').val();
      var password = $('#password').val();

      // Check username and password (replace with your own validation logic)
      if (username === 'yamini' && password === 'password') {
        // Show success SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome, ' + username + '!',
          onClose: function () {

            form.submit();
          }
        });
      } else {
        // Show error SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password.'
        });
      }
    }

  });
});
