//THIS is image generation endpoint

const download=require("image-downloader");
const sharp = require('sharp')
const { fileExtension } = require('./auth')

//type of img
const imageTypes = ['jpg', 'tif', 'gif', 'png', 'svg']

exports.create_thumbnail=(req,res,next)=>{
    const {imageUrl}=req.body;
    const imageUrlExt = fileExtension(imageUrl).toLowerCase();
    if (imageTypes.includes(imageUrlExt)) {
        // Download image and save.
        const options = {
          url: imageUrl,
          dest: './public/images/original/',
        }
        // Set location for resized images to be saved.
        const resizeFolder = './public/images/resized/'
    
        // Download image from the url and save in selected destination in options.
        download.image(options)
          .then(({ filename }) => {
            // Resize image to 50x50 and save to desired location.
            // Return conversion status to user.
            sharp(filename)
              .resize(50, 50)
              .toFile(`${resizeFolder}output.${imageUrlExt}`, (err) => {
                if (err) { return next(err) }
                return res.json({
                  converted: true, user: req.user.username, success: 'Image has been resized', thumbnail: resizeFolder,
                })
              })
          })
          .catch(() => {
            res.status(400).json({ error: 'Sorry!! Please check your image url and try again' })
          })
      } else {
        res.status(400).json({ error: `Select image files with only this extensions - ${[...imageTypes]}` })
      }
}