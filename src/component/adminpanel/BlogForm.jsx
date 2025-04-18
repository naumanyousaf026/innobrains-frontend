import React, { useState } from "react";
import { FaHeading, FaListUl, FaAlignLeft, FaCloudUploadAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [contentBlocks, setContentBlocks] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [showContentControls, setShowContentControls] = useState(false);

  const handleAddBlock = (type) => {
    setContentBlocks([...contentBlocks, { type, value: "" }]);
    setShowContentControls(false);
  };

  const handleBlockChange = (index, value) => {
    const updated = [...contentBlocks];
    updated[index].value = value;
    setContentBlocks(updated);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const onDrop = (acceptedFiles) => {
    setImageFiles(acceptedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("category", category);
    formData.append("content", JSON.stringify(contentBlocks));
    imageFiles.forEach((file) => formData.append("images", file));
    formData.append("imageURL", imageURL);

    try {
      const res = await axios.post("https://apis.innobrains.pk/api/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Blog uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error uploading blog:", err);
      alert("Failed to upload blog. Please check the console for more info.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="max-w-3xl mx-auto p-8 my-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Create New Blog</h2>
        <button
          type="button"
          onClick={() => setShowContentControls(!showContentControls)}
          className="bg-[#103153] text-white px-6 py-3 rounded-full text-lg font-medium transition duration-300"
        >
          + Add Content Block
        </button>
      </div>

      {showContentControls && (
        <div className="flex gap-6 mb-6">
          {[
            {
              icon: <FaHeading size={20} />,
              label: "Heading",
              type: "heading",
              bg: "bg-[#1031530f]",
            },
            {
              icon: <FaListUl size={20} />,
              label: "Subheading",
              type: "subheading",
              bg: "bg-[#1031530f]",
            },
            {
              icon: <FaAlignLeft size={20} />,
              label: "Paragraph",
              type: "paragraph",
              bg: "bg-[#1031530f]",
            },
          ].map((btn, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddBlock(btn.type)}
              className={`flex flex-col items-center justify-center w-24 h-24 rounded-xl ${btn.bg}`}
            >
              {btn.icon}
              <span className="text-sm font-semibold nunito-sans mt-3">
                {btn.label}
              </span>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
        <div>
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter blog title"
            className="w-full p-3 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-indigo-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-lg font-semibold text-gray-700 mb-2">
            Duration (e.g., 5 min read)
          </label>
          <input
            id="duration"
            type="text"
            placeholder="Enter estimated reading time"
            className="w-full p-3 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-indigo-600"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">
            Category
          </label>
          <input
            id="category"
            type="text"
            placeholder="Enter blog category"
            className="w-full p-3 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-indigo-600"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        {contentBlocks.map((block, index) => (
          <div key={index}>
            <label className="block text-lg font-semibold text-gray-700 capitalize mb-2">
              {block.type}
            </label>
            <input
              type="text"
              placeholder={`Enter ${block.type}`}
              className="w-full p-3 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-indigo-600"
              value={block.value}
              onChange={(e) => handleBlockChange(index, e.target.value)}
              required
            />
          </div>
        ))}

        <div>
          <label htmlFor="imageURL" className="block text-lg font-semibold text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <input
            id="imageURL"
            type="url"
            placeholder="Enter image URL"
            className="w-full p-3 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-indigo-600"
            value={imageURL}
            onChange={handleImageURLChange}
          />
        </div>

        <div
          {...getRootProps()}
          className="border-4 border-dashed border-[#103153] p-5 text-center rounded-lg transition-all"
        >
          <input {...getInputProps()} />
          <FaCloudUploadAlt className="mx-auto text-4xl" />
          <p className="text-lg text-gray-600">Drag & Drop or Click to Upload Images</p>
          <p className="text-sm text-gray-500">Supports only image files</p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#103153] text-white py-4 rounded-lg font-semibold text-lg transition-all"
        >
          Submit Blog Post
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
