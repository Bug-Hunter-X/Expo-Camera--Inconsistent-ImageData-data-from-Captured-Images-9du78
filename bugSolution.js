The solution involves using promises or async/await to ensure that the image data is fully available before attempting to access it.  Here's an example using async/await:

```javascript
async function processImage(image) {
  const imageData = await getImageData(image);
  // Process imageData.data here.  It's guaranteed to be populated.
}

async function getImageData(image) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    ctx.getImageData(0, 0, image.width, image.height).then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err)
    })
  });
}
```
This approach guarantees that `ImageData.data` is accessed only after the `getImageData` promise resolves, preventing race conditions.