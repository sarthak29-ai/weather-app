import React, { memo } from 'react';


const weatherImage = new Map();
// Bulk assign groups to save lines
[0].forEach(c => weatherImage.set(c, "../../assets/images/icon-sunny.webp"));
[1, 2].forEach(c => weatherImage.set(c, "../../assets/images/icon-partly-cloudy.webp"));
[3].forEach(c => weatherImage.set(c, "../..assets/images/icon-overcast.webp"));
[45, 48].forEach(c => weatherImage.set(c, "../../assets/images/icon-fog.webp"));
[51, 53, 55, 56, 57].forEach(c => weatherImage.set(c, "../../assets/images/icon-drizzle.webp"));
[61, 63, 65, 66, 67, 80, 81, 82].forEach(c => weatherImage.set(c, "../../assets/images/icon-rain.webp"));
[71, 73, 75, 77, 85, 86].forEach(c => weatherImage.set(c, "../../assets/images/icon-snow.webp"));
[95, 96, 99].forEach(c => weatherImage.set(c, "../../assets/images/icon-storm.webp"));


const Image = ({code, className=""}) => {
  const image = weatherImage.get(code);
  const imageText = image.split("/")[4].split(".")[0].split("-").reverse().join(" ");
  return (
    <img className={className} src={image} alt={imageText} />
  )
}
export default memo(Image);