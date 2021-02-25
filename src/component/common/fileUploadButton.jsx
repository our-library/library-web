import React, {useRef, forwardRef, useState} from 'react';
import {CameraFilled, PictureFilled} from '@ant-design/icons';

function UploadFileButton(props, ref) {
  const { children, setSelectFile, setPreviewImgURL, isRequiredPrev } = props;
  const fileRef = useRef();
  // const [previewImgURL, setPreviewImgURL] = useState('');


  function handleFileInputChange(e) {
    e.preventDefault();
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => setPreviewImgURL(e.target.result);

    // if(isRequiredPrev === 'true') {
    //   console.log('show');
    //   reader.onload = (e) => {
    //     return setPreviewImgURL(e.target.result)
    //   };
    // }

    setSelectFile(file);
  }


  return (
    <>
      <button className="uploadFileInput">
        <label htmlFor="fileInput">
          {/*<PictureFilled style={{fontSize: "20px"}}/>*/}
          <div className="Btn-transparent Btn-sm">
            파일 올리기
          </div>
        </label>
        <input
          ref={fileRef}
          type="file"
          id="fileInput"
          accept="image/jpg,image/png,image/jpeg"
          className="uploadFileInput"
          onChange={handleFileInputChange}
        />
      </button>
    </>
  )
};


export default forwardRef(UploadFileButton)
