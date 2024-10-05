
     // Add event listeners to all icons for showing product details popup
  document.querySelectorAll('.add-icon').forEach(icon => {
    icon.addEventListener('click', function () {
      // Get the product data from the data attributes
      const productImage = this.getAttribute('data-product-image');
      const productTitle = this.getAttribute('data-product-title');
      const productPrice = this.getAttribute('data-product-price');
      const productDescription = this.getAttribute('data-product-description');
      const productColors = this.getAttribute('data-product-colors').split(',');

      // Populate the popup with the product data
      document.querySelector('.product-image').src = productImage;
      document.querySelector('.product-title').textContent = productTitle;
      document.querySelector('.product-price').textContent = productPrice;
      document.querySelector('.product-description').textContent = productDescription;

      // Clear previous color buttons
      const colorOptionsContainer = document.querySelector('.color-boxes');
      colorOptionsContainer.innerHTML = ''; // Clear any previously added color boxes

      // Create color boxes dynamically
      productColors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');

        // Create color rectangle
        const colorRectangle = document.createElement('div');
        colorRectangle.classList.add('color-rectangle');
        colorRectangle.style.backgroundColor = color.toLowerCase(); // Set the background color

        // Create color text
        const colorText = document.createElement('div');
        colorText.classList.add('color-text');
        colorText.textContent = color;

        // Append both rectangle and text to the color box
        colorBox.appendChild(colorRectangle);
        colorBox.appendChild(colorText);

        // Handle color selection on click
        colorBox.addEventListener('click', function () {
          document.querySelectorAll('.color-box').forEach(box => box.classList.remove('active'));
          this.classList.add('active');
          document.querySelector('.product-image').style.backgroundColor = color.toLowerCase();
        });

        // Add the color box to the container
        colorOptionsContainer.appendChild(colorBox);
      });

      // Show the popup
      document.getElementById('product-popup').classList.remove('hidden');

      // Close popup functionality
      document.querySelector('.close-icon').addEventListener('click', function () {
        document.getElementById('product-popup').classList.add('hidden');
      });
    });
  });

  // Handle add to cart functionality
  document.querySelector('.add-to-cart').addEventListener('click', function () {
    const selectedColor = document.querySelector('.color-box.active');
    const selectedSize = document.getElementById('size-dropdown').value;

    if (!selectedColor) {
      alert('Please select a color.');
      return;
    }

    if (!selectedSize || selectedSize === 'Choose your size') {
      alert('Please select a size.');
      return;
    }

    // Gather product details
    const productDetails = {
      color: selectedColor.querySelector('.color-text').textContent,
      size: selectedSize,
      title: document.querySelector('.product-title').textContent,
      price: document.querySelector('.product-price').textContent
    };

    // Retrieve cart from local storage or initialize it
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the current product to the cart
    cart.push(productDetails);

    // Check if the selected product is "Black" and "Medium"
    if (productDetails.color === 'Black' && productDetails.size === 'M') {
      const softWinterJacket = {
        title: 'Soft Winter Jacket',
        color: 'Black',
        size: 'Medium',
        price: '200' // Actual price of Soft Winter Jacket
      };
      cart.push(softWinterJacket);
      console.log('Soft Winter Jacket automatically added to cart:', softWinterJacket);
    }

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product added to cart successfully!');
    console.log('Cart updated:', cart);
  });
