import { NextResponse } from 'next/server';
import { BlogService } from '@/services/blog.service';

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
    const newBlog = await BlogService.createBlog(data);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    if (error.message === 'Validation failed') {
      return NextResponse.json({ error: error.message, details: error.details }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
