import React, { useState } from 'react'
import axios from 'axios'

export default function UploadExample(props) {
    
    const [files, setFiles] = useState()

    const handleFileChange = (event) => {
        if (event.target.files.length === 0 || event.target.files == undefined) return
        setFiles(event.target.files)
    }
    const sendFiles = async () => {
        let formData = new FormData()
        formData.append('file', files[0])
        const { data } = await axios.post('/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (data.success) {
            setFiles()
            props.getImgName(files[0].name)
        }
    }
    return (
        <div className="upload-foto">
            <label htmlFor="file" className="file">{
                files == undefined 
                ? 
                <i className="fas fa-plus"></i> 
                : 
                files[0].name
                }
            <input type="file" accept="image/*" name="photo" id="file" hidden onChange={handleFileChange} /> </label>
            <button onClick={sendFiles} disabled={files == undefined}>Upload</button>
        </div>
    )
}
