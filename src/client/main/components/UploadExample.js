import React, { useState } from 'react'
import axios from 'axios'

export default function UploadExample(props) {
    
    const [files, setFiles] = useState();
    const [backgroundImg, setBackground] = useState(`${props.image}`);

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
            setBackground(files[0].name)
        }

    }

    return (
        <div className="upload-foto" style={{ background: `${backgroundImg?`URL(./img/${backgroundImg})`:'white'}`}}>
            {
                files == undefined 
                ?
                    <label htmlFor="file" className="file">
                        {
                            backgroundImg === ''
                            ?<i className="fas fa-camera"></i>
                            :null
                        }
                        <input type="file" accept="image/*" name="photo" id="file" hidden onChange={handleFileChange} />
                    </label>
                :<i className="fas fa-plus" onClick={sendFiles}></i> 
            }
        </div>
    )
}
