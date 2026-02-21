import { NextResponse } from 'next/server';
import { BlogService } from '@/services/blog.service';
import { revalidatePath } from 'next/cache';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const blog = await BlogService.getBlogById(id);
    return NextResponse.json(blog);
  } catch (error) {
    const status = error.message === 'Blog not found' ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updatedBlog = await BlogService.updateBlog(id, data);

    // Revalidate paths to clear cache and show updated post
    revalidatePath('/');
    revalidatePath('/dashboard');
    revalidatePath(`/blog/${id}`);

    return NextResponse.json(updatedBlog);
  } catch (error) {
    if (error.message === 'Validation failed') {
      return NextResponse.json({ error: error.message, details: error.details }, { status: 400 });
    }
    const status = error.message === 'Blog not found' ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await BlogService.deleteBlog(id);

    // Revalidate paths to clear cache and remove deleted post
    revalidatePath('/');
    revalidatePath('/dashboard');

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
