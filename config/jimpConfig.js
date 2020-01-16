const Jimp = require('jimp');

// Create a function that helps set up the configuration
module.exports = async (images, width, height, quality) => {
    await Promise.all(
        images.map(async imgPath => {
            const image = await Jimp.read(imgPath); // reads the image
            await image.resize(width, height); // resize the image size with the provided width
            await image.quality(quality); // set a required quality i.e 90%
            await image.writeAsync(imgPath); // write the image without callback using async
        })
    )
}

// Jimp.read(imgPath, (err, imgName) => {
//     if (err) throw err;

//     imgName
//         .resize(1920, 1080)
//         .quality(90)
//         .writeAsync(imgPath)
// })

