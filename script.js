document.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById('colorWheel');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'data:image/png;base64,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'; // Replace this with your actual base64 string

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    console.log("Image loaded and drawn on canvas.");
  };
  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`Clicked coordinates: x=${x}, y=${y}`);

    const imageData = ctx.getImageData(x, y, 1, 1).data;
    console.log(`Image data: ${imageData}`);

    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];
    const hexColor = rgbToHex(r, g, b);
    document.getElementById('colorValue').textContent = `Selected Color: ${hexColor}`;
    document.getElementById('rgbValue').textContent = `RGB: (${r}, ${g}, ${b})`;

    document.getElementById('rValue').value = r;
    document.getElementById('gValue').value = g;
    document.getElementById('bValue').value = b;

    // Update background color
    document.body.style.backgroundColor = hexColor;
  });

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  function updateColor() {
    const r = parseInt(document.getElementById('rValue').value);
    const g = parseInt(document.getElementById('gValue').value);
    const b = parseInt(document.getElementById('bValue').value);

    if (r > 255 || g > 255 || b > 255) {
      document.getElementById('invalidInputMessage').style.display = 'block';
      return;
    } else {
      document.getElementById('invalidInputMessage').style.display = 'none';
    }

    const hexColor = rgbToHex(r, g, b);
    document.getElementById('colorValue').textContent = `Selected Color: ${hexColor}`;
    document.getElementById('rgbValue').textContent = `RGB: (${r}, ${g}, ${b})`;

    // Update background color
    document.body.style.backgroundColor = hexColor;
  }

  function showPasswordInput() {
    document.getElementById('passwordInputDiv').style.display = 'block';
  }

  function validatePassword() {
    const inputPassword = document.getElementById('passwordInput').value;
    document.getElementById('passwordInputDiv').style.display = 'none'; // Hide password input
    if (inputPassword === PASSWORD) {
      sendColor();
    } else {
      alert('Incorrect password!');
    }
  }

  function sendColor() {
    const color = document.getElementById('colorValue').textContent.split(': ')[1];
    // Send the color value to your server or ESP8266
    console.log(`Color to send: ${color}`);
  }

  function addGPIOControl(gpioNumber) {
    const gpioControlsDiv = document.getElementById('gpioControls');
    const gpioDiv = document.createElement('div');
    gpioDiv.className = 'gpio';

    const label = document.createElement('label');
    label.textContent = `GPIO ${gpioNumber}: `;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `gpio${gpioNumber}`;
    input.addEventListener('change', () => {
      const state = input.checked ? 'ON' : 'OFF';
      console.log(`GPIO ${gpioNumber} is ${state}`);
      fetch(`/setGPIO?pin=${gpioNumber}&state=${state}`)
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });

    gpioDiv.appendChild(label);
    gpioDiv.appendChild(input);
    gpioControlsDiv.appendChild(gpioDiv);
  }

  function sendButtonValue(button) {
    console.log(`Button ${button} pressed`);
    fetch(`/button?name=${button}`)
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  // Add GPIO controls dynamically (you can adjust the number of GPIOs as needed)
  addGPIOControl(0);
  addGPIOControl(1);
  addGPIOControl(2);
  addGPIOControl(3);
  addGPIOControl(4);

});
