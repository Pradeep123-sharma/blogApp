// In-memory blog storage singleton persistent across module reloads in Next.js
if (!globalThis._blogs) {
  console.log('[BlogStore] Initializing empty blog store');
  globalThis._blogs = [];
}

export const getBlogs = () => {
  console.log(`[BlogStore] Fetching all blogs. Count: ${globalThis._blogs.length}`);
  return globalThis._blogs;
};

export const getBlogById = (id) => {
  console.log(`[BlogStore] Fetching blog by id: ${id}`);
  return globalThis._blogs.find(b => b.id === id);
};

export const addBlog = (blog) => {
  console.log('[BlogStore] Adding new blog:', blog.title);
  const newBlog = {
    ...blog,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    preview: blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : ''
  };
  globalThis._blogs = [newBlog, ...globalThis._blogs];
  console.log(`[BlogStore] Blog added. New count: ${globalThis._blogs.length}`);
  return newBlog;
};

export const updateBlog = (id, updatedBlog) => {
  console.log(`[BlogStore] Updating blog id: ${id}`);
  globalThis._blogs = globalThis._blogs.map(b => b.id === id ? {
    ...b,
    ...updatedBlog,
    preview: updatedBlog.content ? updatedBlog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : b.preview
  } : b);
  return globalThis._blogs.find(b => b.id === id);
};

export const deleteBlog = (id) => {
  console.log(`[BlogStore] Deleting blog id: ${id}`);
  globalThis._blogs = globalThis._blogs.filter(b => b.id !== id);
};
