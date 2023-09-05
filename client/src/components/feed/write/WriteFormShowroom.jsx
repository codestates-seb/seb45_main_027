import React, { useRef, useEffect, useState } from "react";

const DEFAULT_EDITOR_TEXT = "내용을 입력해주세요";

const WriteFormShowroom = () => {
  const [editor, setEditor] = useState(DEFAULT_EDITOR_TEXT);
  const editorRef = useRef(null);
  const [imageData, setImageData] = useState([]); // 이미지 url과 이미지내 tags 정보를 저장하는 상태

  useEffect(() => {
    if (editor === DEFAULT_EDITOR_TEXT) {
      editorRef.current.innerHTML = editor;
    }
  }, [editor]);

  const handleFocus = () => {
    if (editor === DEFAULT_EDITOR_TEXT) {
      setEditor("");
    }
  };

  const handleBlur = () => {
    const inputText = editorRef.current.innerHTML.trim();
    setEditor(inputText || DEFAULT_EDITOR_TEXT);
  };

  const ImageUpload = (e) => {
    const { files } = e.target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const imageUrl = reader.result;
        const newEditorContent = editor === DEFAULT_EDITOR_TEXT ? "" : editor;
        const EditorContent = `${newEditorContent}<div class="imgContainer relative"><img src="${imageUrl}" alt="Uploaded Image"></div><br>`;

        // 이미지와 태그 정보 저장, 에디터 정보 저장
        setImageData([...imageData, { imageUrl, tags: [] }]);
        setEditor(EditorContent);
        e.target.value = null;
      };
    }
  };

  // 이미지내 태그를 추가하는 함수
  const addTag = (x, y, imageIndex, e) => {
    // 이미지, 태그를 둘러싸고 있는 div
    const parentDiv = e.target.closest(".imgContainer");
    if (!parentDiv) return; // imgContainer 없으면 바로 return

    // 이미지내 태그를 부모요소 대비 %로 설정하기 위함
    const containerWidth = parentDiv.offsetWidth;
    const containerHeight = parentDiv.offsetHeight;

    const xPercentage = (x / containerWidth) * 100;
    const yPercentage = (y / containerHeight) * 100;
    const tagText = window.prompt("Enter tag text:", "Tag");

    if (!tagText) return;

    const newTag = {
      x: xPercentage + "%",
      y: yPercentage + "%", // %로 바꾸기
      text: tagText, // 태그 text내용 로직 추가해야함
    };

    // 현재 클릭한 사진에 tag 추가
    const updatedImageData = [...imageData];
    updatedImageData[imageIndex].tags.push(newTag);
    setImageData(updatedImageData);

    // tag 속성
    const tagElement = document.createElement("span");
    tagElement.className = "imagetag";
    tagElement.style.position = "absolute";
    tagElement.style.left = newTag.x;
    tagElement.style.top = newTag.y;
    tagElement.innerText = newTag.text;

    // tagElement.addEventListener("click", () => {
    //   alert(`Tag Clicked: ${newTag.text}`);
    // }); //안됨

    // img컨테이너의 요소로 추가
    parentDiv.appendChild(tagElement);
  };

  // 업로드된 이미지에 온클릭이벤트 핸들러함수 - 클릭한 사진을 index로 판별
  const handleEditorClick = (e) => {
    if (e.target.tagName === "IMG") {
      const imageIndex = imageData.findIndex(
        (data) => data.imageUrl === e.target.src
      );
      if (imageIndex !== -1) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        addTag(x, y, imageIndex, e);
      }
    }
  };

  // const imagetagSelect = document.querySelector(".imagetag");
  // if (imagetagSelect) {
  //   imagetagSelect.addEventListener("click", (el) => {
  //     alert(`Tag Clicked: ${el.text}`);
  //   });
  // }
  // console.log(imagetagSelect);

  useEffect(() => {
    const imageTagElements = document.querySelectorAll(".imagetag");

    imageTagElements.forEach((element, idx) => {
      element.addEventListener("click", () => {
        const editText = window.prompt("Enter tag text:", element.innerText);

        if (editText !== null) {
          // Find the clicked tag within imageData
          let clickedImageIndex = -1;
          let clickedTagIndex = -1;

          for (let i = 0; i < imageData.length; i++) {
            const image = imageData[i];
            const tagIndex = image.tags.findIndex(
              (tag) => tag.text === element.innerText
            );
            if (tagIndex !== -1) {
              clickedImageIndex = i;
              clickedTagIndex = tagIndex;
              break; // Exit the loop once we find the tag
            }
          }

          if (clickedImageIndex !== -1 && clickedTagIndex !== -1) {
            // Update the tag's text within imageData
            const updatedImageData = [...imageData];
            updatedImageData[clickedImageIndex].tags[clickedTagIndex].text =
              editText;
            setImageData(updatedImageData);
          }
        }
      });
    });
    console.log(imageData);

    return () => {
      imageTagElements.forEach((element) => {
        element.removeEventListener("click", () => {
          console.log(element.innerHTML);
        });
      });
    };
  }, [imageData]);

  return (
    <>
      {/* 이미지 입력 버튼 */}
      <div className="mb-2 pb-2 border-b">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <img className="p-2" src="/images/gallery.png" alt="" />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={ImageUpload}
        />
      </div>

      <div
        ref={editorRef}
        className="relative w-full h-full min-h-[500px] p-2 border-b"
        contentEditable={true}
        onFocus={handleFocus}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: editor }}
        onClick={handleEditorClick}
      />

      {imageData.map((image, index) => (
        <div className="imgContainer relative" key={index}>
          <img src={image.imageUrl} alt="Uploaded Image" />
          {image.tags.map((tag, tagIndex) => (
            <span
              className="imagetag"
              key={tagIndex}
              style={{ position: "absolute", left: tag.x, top: tag.y }}
            >
              {tag.text}
            </span>
          ))}
        </div>
      ))}
    </>
  );
};

export default WriteFormShowroom;
