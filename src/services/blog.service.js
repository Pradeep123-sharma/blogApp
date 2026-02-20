import { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog } from '@/lib/blog-store';
import { BlogSchema } from '@/schemas/blog.schema';

export const BlogService = {
    async getAllBlogs() {
        return getBlogs();
    },

    async getBlogById(id) {
        const blog = getBlogById(id);
        if (!blog) throw new Error('Blog not found');
        return blog;
    },

    async createBlog(data) {
        const { isValid, errors } = BlogSchema.validate(data);
        if (!isValid) {
            const error = new Error('Validation failed');
            error.details = errors;
            throw error;
        }

        const formattedData = BlogSchema.formatForStorage(data);
        return addBlog(formattedData);
    },

    async updateBlog(id, data) {
        const { isValid, errors } = BlogSchema.validate(data);
        if (!isValid) {
            const error = new Error('Validation failed');
            error.details = errors;
            throw error;
        }

        const formattedData = BlogSchema.formatForStorage(data);
        const updated = updateBlog(id, formattedData);
        if (!updated) throw new Error('Blog not found');
        return updated;
    },

    async deleteBlog(id) {
        deleteBlog(id);
        return { success: true };
    }
};
