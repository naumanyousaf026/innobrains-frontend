import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const BlogForm = () => {
  const [editorValue, setEditorValue] = useState("");

  const handleChange = (value) => {
    setEditorValue(value);
  };

  return (
    <div>
      <h2>Create a New Blog Post</h2>
      <ReactQuill 
        value={editorValue}
        onChange={handleChange}
        placeholder="Write your blog content here..."
        modules={modules}
      />
      <button onClick={() => console.log(editorValue)}>Save Post</button>
    </div>
  );
}

// Configuring Quill options (modules)
const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline'],
    ['link'],
    ['image'],
    ['blockquote'],
  ],
};

export default BlogForm;
