import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogReactions from '@/components/BlogReactions';
import BlogComments from '@/components/BlogComments';
import WelcomeModal from '@/components/WelcomeModal';
import styles from './blog-post.module.css';

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
    <>
      <Navbar />
      <div className={styles.article}>
        <WelcomeModal blogId={blog.id} />
        <article className={styles.container}>
          <header className={styles.articleHeader}>
            <div className={styles.publishDate}>
              {format(new Date(blog.published_at), 'MMMM dd, yyyy')}
            </div>
            <h1 className={styles.articleTitle}>
              {blog.title}
            </h1>
            {blog.featured_image && (
              <div className={styles.featuredImage}>
                <Image
                  src={blog.featured_image}
                  alt={blog.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </header>

          <div
            className={styles.richTextContent}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className={styles.reactionsSection}>
            <BlogReactions blogId={blog.id} initialLikes={blog.likes} initialLoves={blog.loves} initialDislikes={blog.dislikes} />
          </div>
        </article>

        <section className={styles.container}>
          <div className={styles.commentsSection}>
            <BlogComments blogId={blog.id} />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
