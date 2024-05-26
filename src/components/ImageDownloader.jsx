import React from 'react'
import downloadPic from '../images/download.svg'

function ImageDownloader({ imageUrl, filename }) {
    const handleDownloadFunc = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = filename || 'downloaded-image';
        link.click();
    }

  return (
    <div>
    <button onClick={handleDownloadFunc}><img src={downloadPic} style={{height:"28px" }} alt="" /></button>
    </div>
  )
}

export default ImageDownloader
