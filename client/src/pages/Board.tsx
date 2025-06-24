import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import PostForm from "@/components/PostForm";
import AdBanner from "@/components/AdBanner";

export default function Board() {
  const { boardSlug } = useParams();
  
  const { data: board } = useQuery({
    queryKey: [`/api/boards/${boardSlug}`],
  });

  const { data: threads } = useQuery({
    queryKey: [`/api/boards/${boardSlug}/threads`],
  });

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="retro-container">
      {/* Header */}
      <div className="retro-header">
        <Link href="/">
          <div className="retro-logo" style={{ cursor: 'pointer' }}>lagchan</div>
        </Link>
        <div className="retro-tagline">
          /{boardSlug}/ - {board.name} - {board.description}
        </div>
      </div>

      {/* Navigation */}
      <div className="retro-navbar">
        <Link href="/"><a>[Home]</a></Link>
        <Link href={`/${boardSlug}`}><a>[Return to Board]</a></Link>
        <Link href="/faq"><a>[FAQ]</a></Link>
        <Link href="/rules"><a>[Rules]</a></Link>
      </div>

      {/* Ad Banner */}
      <AdBanner
        title="📚 THEORY READING GROUP"
        content="Weekly discussions on revolutionary theory! Join our Telegram for updates."
        link="#" 
        linkText="JOIN NOW!"
      />

      {/* Post Form */}
      <PostForm boardSlug={boardSlug} />

      {/* Threads List */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ 
          backgroundColor: 'hsl(210, 30%, 85%)',
          padding: '5px',
          fontWeight: 'bold',
          fontSize: '10pt',
          border: '1px solid var(--border)',
          borderBottom: 'none'
        }}>
          📋 Threads in /{boardSlug}/
        </div>
        
        {threads && threads.length > 0 ? (
          threads.map((thread: any) => (
            <div key={thread.id} style={{
              padding: '10px',
              borderLeft: '1px solid var(--border)',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              backgroundColor: 'hsl(210, 35%, 89%)'
            }}>
              <div style={{ fontSize: '9pt', marginBottom: '5px' }}>
                <Link href={`/${boardSlug}/thread/${thread.id}`}>
                  <a style={{ fontWeight: 'bold', fontSize: '10pt' }}>
                    {thread.subject || `Thread #${thread.id}`}
                  </a>
                </Link>
                <span style={{ marginLeft: '10px', color: '#666' }}>
                  Started {new Date(thread.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            padding: '20px',
            border: '1px solid var(--border)',
            backgroundColor: 'hsl(210, 35%, 89%)',
            textAlign: 'center',
            fontSize: '10pt'
          }}>
            No threads yet. Be the first to post!
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="retro-footer">
        <Link href="/"><a>Home</a></Link> | 
        <Link href="/faq"><a>FAQ</a></Link> | 
        <Link href="/rules"><a>Rules</a></Link>
      </div>
    </div>
  );
}
