import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Post from "@/components/Post";
import PostForm from "@/components/PostForm";
import AdBanner from "@/components/AdBanner";

export default function Thread() {
  const { boardSlug, threadId } = useParams();
  
  const { data: thread, isLoading } = useQuery({
    queryKey: [`/api/threads/${threadId}`],
  });

  const { data: board } = useQuery({
    queryKey: [`/api/boards/${boardSlug}`],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!thread) {
    return <div>Thread not found</div>;
  }

  return (
    <div className="retro-container">
      {/* Header */}
      <div className="retro-header">
        <Link href="/">
          <div className="retro-logo" style={{ cursor: 'pointer' }}>lagchan</div>
        </Link>
        <div className="retro-tagline">
          /{boardSlug}/ - {board?.name} - Thread #{threadId}
        </div>
      </div>

      {/* Navigation */}
      <div className="retro-navbar">
        <Link href="/"><a>[Home]</a></Link>
        <Link href={`/${boardSlug}`}><a>[Return to Board]</a></Link>
        <a href="#bottom">[Bottom]</a>
        <Link href="/faq"><a>[FAQ]</a></Link>
        <Link href="/rules"><a>[Rules]</a></Link>
      </div>

      {/* Ad Banner */}
      <AdBanner
        title="💡 PHILOSOPHY CORNER"
        content="Explore dialectical materialism, critical theory, and more! Free e-books available."
        link="#"
        linkText="READ NOW!"
        backgroundColor="#E6E6FA"
        titleColor="#4B0082"
        linkColor="#4B0082"
      />

      {/* Thread Title */}
      {thread.subject && (
        <div style={{
          backgroundColor: 'hsl(45, 30%, 85%)',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid var(--border)',
          fontWeight: 'bold',
          fontSize: '12pt'
        }}>
          📝 {thread.subject}
        </div>
      )}

      {/* Posts */}
      <div style={{ marginBottom: '20px' }}>
        {thread.posts?.map((post: any, index: number) => (
          <Post 
            key={post.id} 
            post={post} 
            isOP={index === 0}
          />
        ))}
      </div>

      {/* Reply Form */}
      <div id="bottom">
        <PostForm 
          boardSlug={boardSlug} 
          threadId={parseInt(threadId!)} 
        />
      </div>

      {/* Footer */}
      <div className="retro-footer">
        <Link href="/"><a>Home</a></Link> | 
        <Link href={`/${boardSlug}`}><a>/{boardSlug}/</a></Link> | 
        <Link href="/faq"><a>FAQ</a></Link> | 
        <Link href="/rules"><a>Rules</a></Link>
      </div>
    </div>
  );
}
