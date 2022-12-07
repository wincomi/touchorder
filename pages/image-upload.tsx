import { NextPage } from "next"
import { useState, useRef } from "react"
import { Button } from 'react-bootstrap'
import getAbsoluteURL from "@utils/absoluteURL"
import axios from "axios"

const image_upload: NextPage = ({ url, getImageName, getImageNameDelete }) => {
  const [selectedImage, setSelectedImage] = useState("")
  const fileInput = useRef()
  // 업로드 처리
  const handleUploadClick = (e) => {
    fileInput.current.click()
  }
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise((resolve) => {
      reader.onload = () => {
        setSelectedImage(reader.result)
        resolve()
      }
    })
  }
  const handleDelete = async () => {
    if (url != "") {
      const result = await fetch(
        getAbsoluteURL() + `/api/images?img=${url}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      getImageNameDelete()
      setSelectedImage("")
    }
  }
  const handleUpload = async (e) => { 
    //버튼 누르기만 하면 사진이 생기니까 뒤로가기해버리면 답이없음
    //=>수정버튼 눌러야 업로드하도록 만드는게 좋음
    if(!e.target.files[0]) return;
    encodeFileToBase64(e.target.files[0])
    try {
      const formData = new FormData()  // 폼 데이터 생성
      formData.append("myImage", e.target.files[0]) // 폼 데이터 추가
      const response = await axios.post("/api/images", formData)
      getImageName(response.data.fileName)
    } catch (error: any) {
      console.log(error.response?.data)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-20 space-y-6">
      <label>
        <Button onClick={handleUploadClick} size="sm">추가</Button>{` `}
        <Button variant="danger" onClick={handleDelete} size="sm">삭제</Button>
        <input
          type="file"
          accept='image/*'
          ref={fileInput}
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <div className="preview">
          {selectedImage && <img src={selectedImage}/>}
        </div>
      </label>
    </div>
  )
}


export default image_upload