// Scales an image down to at most `maxWidth` pixels wide and returns a JPEG.
// Runs in the browser, so the admin can upload a large photo straight from a camera.
export async function resizeImageToJpeg(file: File, maxWidth = 1600, quality = 0.8): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxWidth / bitmap.width)
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Your browser could not process the image.')

  // PNGs can be transparent. JPEG cannot, so paint a white background first.
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, width, height)
  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Could not process the image.'))),
      'image/jpeg',
      quality,
    )
  })
}