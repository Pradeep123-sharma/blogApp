export const BlogSchema = {
    validate(data) {
        const errors = {};
        if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
            errors.title = 'Title must be at least 3 characters long';
        }
        if (!data.content || typeof data.content !== 'string' || data.content.trim().length < 10) {
            errors.content = 'Content must be at least 10 characters long';
        }
        if (!data.author || typeof data.author !== 'string' || data.author.trim().length < 2) {
            errors.author = 'Author name is required';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },

    formatForStorage(data) {
        return {
            title: data.title.trim(),
            content: data.content.trim(),
            author: data.author.trim(),
        };
    }
};
