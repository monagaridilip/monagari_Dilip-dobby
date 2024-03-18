import React, { useState } from 'react'

export default function Main(props) {
  const [file, setFile] = useState(null);
  const [uploading,setUploading] = useState(false)
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
console.log(props.data,"Main")
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true)
    try {
      const response = await fetch('http://localhost:8080/api/image/upload', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(formData)
      });
      console.log('Image uploaded successfully:', response.data);
      setUploading(false)
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false)
    }
  };
  return (
    <div>
      <h1 className='mt-7 text-3xl mx-auto'>Image Upload </h1>
      <form className='mx-auto my-5 p-3 flex flex-row gap-3' >
        <input type="text" name="name" id="name" placeholder='Enter image name'/>
        <div className='flex gap-4'>
            <input type="file" onChange={handleFileChange} className='p-3 border border-gray-700 rounded w-full' id="images" accept='image/*'  />
            <button type='button' disabled={uploading} onClick={handleSubmit} className='p-3 border border-green-700 text-white bg-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading?"uploading":"upload"}</button>
            </div>
      </form>
    </div>
  )
}
