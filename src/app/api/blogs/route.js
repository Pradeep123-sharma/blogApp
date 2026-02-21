import { NextResponse } from 'next/server';
import { BlogService } from '@/services/blog.service';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogs = await BlogService.getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('[API/POST] Creating new blog:', data.title);
    const newBlog = await BlogService.createBlog(data);

    console.log('[API/POST] Blog created successfully. ID:', newBlog.id);

    // Revalidate paths to clear cache and show new post
    console.log('[API/POST] Triggering revalidation for / and /dashboard');
    revalidatePath('/');
    revalidatePath('/dashboard');

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('[API/POST] Error creating blog:', error);
    if (error.message === 'Validation failed') {
      return NextResponse.json({ error: error.message, details: error.details }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
