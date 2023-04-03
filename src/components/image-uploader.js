import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useRef } from "react";
const ImageUploader = (props) => {
  const imagePickerRef = useRef();
  return (
    <form>
      <AddPhotoAlternateOutlinedIcon
        color="action"
        onClick={() => imagePickerRef.current.click()}
      />
      <input
        ref={imagePickerRef}
        style={{ display: "none" }}
        type="file"
        alt=""
        multiple
        accept="image/*"
        onChange={(e) => {
          props?.imagePickerState(e?.target?.files);
        }}
      />
    </form>
  );
};

export default ImageUploader;
