// In-memory blog storage singleton persistent across module reloads in Next.js
if (!global._blogs) {
  global._blogs = [
    // {
    //   id: '1',
    //   title: 'Getting Started with Next.js 14',
    //   author: 'Admin',
    //   date: '2023-11-01',
    //   content: '<p>Next.js 14 introduced amazing features like Server Actions and improved performance.</p>',
    //   preview: 'Next.js 14 introduced amazing features like Server Actions and improved performance.'
    // },
    // {
    //   id: '2',
    //   title: 'Mastering Tailwind CSS',
    //   author: 'Jane Doe',
    //   date: '2023-11-05',
    //   content: '<p>Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.</p>',
    //   preview: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.'
    // }
  ];
}

export const getBlogs = () => global._blogs;

export const getBlogById = (id) => global._blogs.find(b => b.id === id);

export const addBlog = (blog) => {
  const newBlog = {
    ...blog,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    preview: blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : ''
  };
  global._blogs = [newBlog, ...global._blogs];
  return newBlog;
};

export const updateBlog = (id, updatedBlog) => {
  global._blogs = global._blogs.map(b => b.id === id ? {
    ...b,
    ...updatedBlog,
    preview: updatedBlog.content ? updatedBlog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : b.preview
  } : b);
  return global._blogs.find(b => b.id === id);
};

export const deleteBlog = (id) => {
  global._blogs = global._blogs.filter(b => b.id !== id);
};
