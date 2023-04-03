import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const readFileAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const GetSlides = async (imageFiles) => {
  let images = [];
  for (let index = 0; index < imageFiles.length; index++) {
    const imageFile = imageFiles[index];
    var result = await readFileAsBase64(imageFile);
    images.push(result);
  }
  return images.map((i) => ({ src: i }));
};

const ImagePreviewer = (props) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    GetSlides(props?.images).then((res) => setSlides(res));
  }, [props?.images]);

  return (
    <div>
      <Lightbox
        close={() => props.handlePreview(false)}
        open={props.previewState}
        slides={slides}
      />
    </div>
  );
};

export default ImagePreviewer;
