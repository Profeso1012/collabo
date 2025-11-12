import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BlogReactions from '@/components/BlogReactions';
import BlogComments from '@/components/BlogComments';
import WelcomeModal from '@/components/WelcomeModal';

export const revalidate = 60;

async function getBlog(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <WelcomeModal blogId={blog.id} />
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <div className="text-sm text-gray-500 mb-4">
            {format(new Date(blog.published_at), 'MMMM dd, yyyy')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-maroon mb-6">
            {blog.title}
          </h1>
          {blog.featured_image && (
            <div className="relative h-96 rounded-xl overflow-hidden mb-8">
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </header>

        <div
          className="rich-text-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <BlogReactions blogId={blog.id} initialLikes={blog.likes} initialLoves={blog.loves} initialDislikes={blog.dislikes} />
      </article>

      <div className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-200">
        <BlogComments blogId={blog.id} />
      </div>
    </div>
  );
}
