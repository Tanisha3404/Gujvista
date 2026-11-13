# Resizes the oversized photos into a NEW folder called "resized-images".
# Your originals are not changed.
Add-Type -AssemblyName System.Drawing

$sourceRoot = Join-Path (Get-Location) "src\assets\images"
$outputRoot = Join-Path (Get-Location) "resized-images"

# file (relative to src\assets\images) = maximum width in pixels
$files = @{
  "destinations\ahmedabad-heritage-city.jpg"            = 1600
  "destinations\mandvi-beach.jpg"                       = 1600
  "destinations\modhera-sun-temple.jpg"                 = 1600
  "destinations\zarwani-waterfall.jpg"                  = 1600
  "destinations\laxmi-vilas-palace.jpg"                 = 1600
  "destinations\champaner-pavagadh.jpg"                 = 1600
  "destinations\velavadar-blackbuck-national-park.jpg"  = 1600
  "destinations\dholavira.jpg"                          = 1600
  "destinations\junagadh-uparkot-fort.jpg"              = 1600
  "destinations\shatrunjaya-hill.jpg"                   = 1600
  "destinations\polo-forest.jpg"                        = 1600
  "culture\festival-kite-uttarayan.jpg"                 = 1200
}

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 75L)

foreach ($relative in $files.Keys) {
  $maxWidth = $files[$relative]
  $inPath = Join-Path $sourceRoot $relative
  $outPath = Join-Path $outputRoot $relative
  New-Item -ItemType Directory -Force -Path (Split-Path $outPath) | Out-Null

  $image = [System.Drawing.Image]::FromFile($inPath)
  $newWidth = [Math]::Min($maxWidth, $image.Width)
  $newHeight = [int]($image.Height * $newWidth / $image.Width)

  $bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
  $bitmap.Save($outPath, $codec, $encoderParams)

  $graphics.Dispose(); $bitmap.Dispose(); $image.Dispose()
  Write-Host "$relative -> ${newWidth}x${newHeight}"
}