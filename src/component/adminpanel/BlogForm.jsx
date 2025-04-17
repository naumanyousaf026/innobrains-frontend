import React, { useState, useEffect } from "react";
import { FaHeading, FaListUl, FaAlignLeft, FaImage, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import slugify from "slugify"; // Import slugify

const BlogForm = ({ blog, onClose }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(""); // Add state for slug
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [contentBlocks, setContentBlocks] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [showContentControls, setShowContentControls] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load blog data when editing
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setSlug(blog.slug || "");
      setDuration(blog.duration || "");
      setCategory(blog.category || "");
      setContentBlocks(blog.content || []);
      // Featured image would be the first one in images array
      if (blog.images && blog.images.length > 0) {
        setFeaturedImage({ preview: `https://apis.innobrains.pk${blog.images[0]}` });
      }
    }
  }, [blog]);

  // Auto-generate slug when title changes
  useEffect(() => {
    if (title) {
      const generatedSlug = slugify(title, { lower: true, strict: true });
      setSlug(generatedSlug);
    }
  }, [title]);

  const handleAddBlock = (type) => {
    setContentBlocks([...contentBlocks, { type, value: "" }]);
    setShowContentControls(false);
  };

  const handleBlockChange = (index, value) => {
    const updated = [...contentBlocks];
    updated[index].value = value;
    setContentBlocks(updated);
  };

  const handleAddImageBlock = () => {
    setContentBlocks([...contentBlocks, { type: "image", value: "" }]);
    setShowContentControls(false);
  };

  const handleImageBlockChange = (index, file) => {
    const updated = [...contentBlocks];
    if (file) {
      updated[index].file = file;
      updated[index].value = URL.createObjectURL(file);
    }
    setContentBlocks(updated);
  };

  const handleImageURLBlockChange = (index, url) => {
    const updated = [...contentBlocks];
    updated[index].value = url;
    setContentBlocks(updated);
  };

  const handleFeaturedImageChange = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFeaturedImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const removeBlock = (index) => {
    const updated = [...contentBlocks];
    updated.splice(index, 1);
    setContentBlocks(updated);
  };

  const moveBlockUp = (index) => {
    if (index > 0) {
      const updated = [...contentBlocks];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      setContentBlocks(updated);
    }
  };

  const moveBlockDown = (index) => {
    if (index < contentBlocks.length - 1) {
      const updated = [...contentBlocks];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      setContentBlocks(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug); // Add slug to formData
    formData.append("duration", duration);
    formData.append("category", category);

    // Process content blocks
    const processedBlocks = await Promise.all(
      contentBlocks.map(async (block, index) => {
        // For image blocks with file attachments, we need to remove the file property
        // before JSON stringifying and add the file to formData
        if (block.type === "image" && block.file) {
          formData.append(`contentImage_${index}`, block.file);
          return { type: block.type, value: `contentImage_${index}` };
        }
        return { type: block.type, value: block.value };
      })
    );

    formData.append("content", JSON.stringify(processedBlocks));

    // Add featured image if exists
    if (featuredImage && featuredImage.file) {
      formData.append("images", featuredImage.file);
    }

    try {
      let response;
      if (blog) {
        // Update existing blog
        response = await axios.put(
          `https://apis.innobrains.pk/api/blog/${blog._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Create new blog
        response = await axios.post(
          "https://apis.innobrains.pk/api/blog",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      alert(blog ? "Blog updated successfully!" : "Blog created successfully!");
      onClose();
    } catch (err) {
      console.error("Error saving blog:", err);
      setError("Failed to save blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { getRootProps: getFeaturedImageRootProps, getInputProps: getFeaturedImageInputProps } = 
    useDropzone({
      onDrop: handleFeaturedImageChange,
      accept: "image/*",
      maxFiles: 1,
    });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {blog ? "Edit Blog" : "Create New Blog"}
        </h2>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setShowContentControls(!showContentControls)}
            className="bg-[#103153] text-white px-5 py-2 rounded-lg text-lg font-medium hover:bg-[#1e4b7c] transition"
          >
            + Add Content Block
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg text-lg font-medium hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      {showContentControls && (
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          {[
            {
              icon: <FaHeading size={20} />,
              label: "Heading",
              type: "heading",
              bg: "bg-blue-50 hover:bg-blue-100",
            },
            {
              icon: <FaListUl size={20} />,
              label: "Subheading",
              type: "subheading",
              bg: "bg-green-50 hover:bg-green-100",
            },
            {
              icon: <FaAlignLeft size={20} />,
              label: "Paragraph",
              type: "paragraph",
              bg: "bg-yellow-50 hover:bg-yellow-100",
            },
            {
              icon: <FaImage size={20} />,
              label: "Image",
              type: "image",
              bg: "bg-purple-50 hover:bg-purple-100",
              onClick: handleAddImageBlock,
            },
          ].map((btn, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => btn.onClick ? btn.onClick() : handleAddBlock(btn.type)}
              className={`flex flex-col items-center justify-center w-28 h-28 rounded-xl ${btn.bg} transition-all`}
            >
              {btn.icon}
              <span className="text-sm font-semibold mt-2">{btn.label}</span>
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter blog title"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#103153] focus:border-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-lg font-semibold text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              id="slug"
              type="text"
              placeholder="blog-post-url"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#103153] focus:border-transparent"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              This will appear in the URL: https://innobrains.pk/blog/{slug}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="duration" className="block text-lg font-semibold text-gray-700 mb-2">
              Reading Time
            </label>
            <input
              id="duration"
              type="text"
              placeholder="E.g., 5 min read"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#103153] focus:border-transparent"
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
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#103153] focus:border-transparent"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Featured Image
          </label>
          <div
            {...getFeaturedImageRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition ${
              featuredImage ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-[#103153]"
            }`}
          >
            <input {...getFeaturedImageInputProps()} />
            {featuredImage ? (
              <div className="relative">
                <img
                  src={featuredImage.preview}
                  alt="Featured"
                  className="h-40 mx-auto object-contain"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeaturedImage(null);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            ) : (
              <div className="py-4">
                <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400" />
                <p className="mt-2 text-gray-600">Click or drag to upload featured image</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Content Blocks</h3>
          {contentBlocks.length === 0 ? (
            <div className="p-8 bg-gray-50 text-center rounded-lg">
              <p className="text-gray-500">No content blocks added yet. Click "Add Content Block" to start building your blog.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {contentBlocks.map((block, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 capitalize">{block.type}</span>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => moveBlockUp(index)}
                        disabled={index === 0}
                        className={`p-1 rounded ${
                          index === 0 ? "text-gray-400" : "text-blue-600 hover:bg-blue-100"
                        }`}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlockDown(index)}
                        disabled={index === contentBlocks.length - 1}
                        className={`p-1 rounded ${
                          index === contentBlocks.length - 1
                            ? "text-gray-400"
                            : "text-blue-600 hover:bg-blue-100"
                        }`}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBlock(index)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>

                  {block.type === "image" ? (
                    <div>
                      {block.value ? (
                        <div className="relative mb-2">
                          <img
                            src={block.value}
                            alt="Content"
                            className="h-32 mx-auto object-contain"
                          />
                        </div>
                      ) : null}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageBlockChange(index, e.target.files[0]);
                              }
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Or Image URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={block.value}
                            onChange={(e) => handleImageURLBlockChange(index, e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                    </div>
                  ) : block.type === "heading" ? (
                    <input
                      type="text"
                      placeholder="Enter heading"
                      className="w-full p-3 border border-gray-300 rounded text-xl font-bold"
                      value={block.value}
                      onChange={(e) => handleBlockChange(index, e.target.value)}
                    />
                  ) : block.type === "subheading" ? (
                    <input
                      type="text"
                      placeholder="Enter subheading"
                      className="w-full p-3 border border-gray-300 rounded text-lg font-semibold"
                      value={block.value}
                      onChange={(e) => handleBlockChange(index, e.target.value)}
                    />
                  ) : (
                    <textarea
                      placeholder="Enter paragraph text"
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={block.value}
                      onChange={(e) => handleBlockChange(index, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#103153] text-white rounded-lg hover:bg-[#1e4b7c] transition flex items-center"
          >
            {isSubmitting ? "Saving..." : blog ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;