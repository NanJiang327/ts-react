import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import Button, { ButtonType } from '../Button/button'
import UploadList from './uploadList'
import Dragger from './dragger'

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void;
  onChange?: (file: File) => void;
  defaultFileList?: UploadFile[];
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onRemove?: (file: UploadFile) =>  void
  headers?: {[key: string]: any}
  name?: string
  data?: {[key: string]: any}
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    defaultFileList,
    beforeUpload,
    onSuccess,
    onChange,
    onError,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
  } = props;
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return
    }
    uploadFiles(files);
    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        postFile(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(proccessedFile => {
            postFile(proccessedFile)
          })
        } else if (result !== false){
          postFile(file)
        }
      }
    })
  }

  const postFile = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setFileList(preList => {
      return [_file, ...preList]
    })
    const formData = new FormData()
      formData.append(name || 'file', file)
      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key])
        })
      }
      axios.post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, {percent: percentage, status: 'uploading'})
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        }
      }).then(res => {
        console.log(res)
        updateFileList(_file, { status: 'success', response: res.data })
        if (onSuccess) {
          onSuccess(res.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      }).catch(err => {
        console.log(err)
        updateFileList(_file, { status: 'error', error: err })
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  return (
    <div className="react-upload-component">
      {/* <Button btnType={ButtonType.Primary} onClick={handleClick}>Upload File</Button> */}
      <div 
        className="react-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}
      >
        {drag ? 
          <Dragger onFile={(files) => {uploadFiles(files)}}>
            {children}
          </Dragger> : children
        }
        <input type="file" 
        className="react-file-input" 
        style={{display: 'none'}} 
        ref={fileRef}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
      />
      </div>
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload;