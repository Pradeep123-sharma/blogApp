import { BlogService } from '@/services/blog.service';
import BlogCard from '@/components/BlogCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const blogs = await BlogService.getAllBlogs();
  console.log(`[HomePage] Rendered with ${blogs.length} blogs`);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Latest Stories</h2>
        <p className="text-slate-500">Insights from our team of developers and designers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
        {blogs.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-400">No blogs found. Be the first to compose one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
