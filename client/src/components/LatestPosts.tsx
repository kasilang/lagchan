import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function LatestPosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/posts/latest?limit=6"],
  });

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  const truncateContent = (content: string, maxLength: number = 50) => {
    if (!content) return "";
    
    // Handle greentext
    if (content.startsWith('>')) {
      return content.length > maxLength 
        ? `${content.substring(0, maxLength)}...`
        : content;
    }
    
    return content.length > maxLength 
      ? `${content.substring(0, maxLength)}...`
      : content;
  };

  return (
    <div className="latest-posts">
      <div className="latest-posts-header">📝 Latest Posts</div>
      {isLoading ? (
        <div className="post-item">Loading...</div>
      ) : posts && posts.length > 0 ? (
        posts.map((post: any) => (
          <div key={post.id} className="post-item">
            <div>
              <Link href={`/${post.boardSlug}`}>
                <span className="post-board">/{post.boardSlug}/</span>
              </Link>
              {" - No. "}
              <strong className="post-number">{post.id}</strong>
            </div>
            <div className="post-preview">
              {truncateContent(post.content)}
            </div>
            <div style={{ fontSize: '8pt', color: '#666' }}>
              {formatTimeAgo(post.createdAt)}
            </div>
          </div>
        ))
      ) : (
        <div className="post-item">No posts yet</div>
      )}
    </div>
  );
}
