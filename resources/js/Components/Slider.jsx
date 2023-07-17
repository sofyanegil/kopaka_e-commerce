import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export default function Slider({ sliders }) {
    const images =
        sliders.length > 0
            ? sliders.map((slider) => ({
                  original: slider.slider_image_url,
              }))
            : [
                  {
                      original: "/assets/images/no-image.png",
                  },
              ];

    return (
        <ImageGallery
            items={images}
            classNames={{
                gallery: "custom-gallery",
                selectedItem: "custom-selected-item",
            }}
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
            showThumbnails={false}
            autoPlay
            showBullets={true}
        />
    );
}
