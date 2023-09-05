import React, { useState } from "react";

const WriteFormShowroomcopy = () => {
  const [editorText, setEditorText] = useState("");
  const [imageURL, setImageURL] = useState(null);

  const handleTextChange = (e) => {
    setEditorText(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter your text here"
        value={editorText}
        onChange={handleTextChange}
        contentEditable={true}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {imageURL && (
        <div>
          <img src={imageURL} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default WriteFormShowroomcopy;
