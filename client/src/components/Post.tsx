import { formatDistanceToNow } from "date-fns";

interface PostProps {
  post: {
    id: number;
    content: string;
    imageUrl?: string;
    imageName?: string;
    createdAt: string;
  };
  isOP?: boolean;
}

export default function Post({ post, isOP }: PostProps) {
  const formatContent = (content: string) => {
    // Handle greentext
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('>')) {
        return (
          <span key={index} className="greentext">
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        );
      }
      return (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div className="thread-post">
      <div className="post-header">
        <span style={{ fontWeight: 'bold' }}>Anonymous</span>
        <span style={{ marginLeft: '10px' }}>
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </span>
        <span style={{ marginLeft: '10px' }}>
          No. <span className="post-number">{post.id}</span>
        </span>
        {isOP && <span style={{ marginLeft: '10px', color: '#FF6600', fontWeight: 'bold' }}>(OP)</span>}
      </div>
      
      {post.imageUrl && (
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '8pt', marginBottom: '3px' }}>
            File: <strong>{post.imageName}</strong>
          </div>
          <img
            src={post.imageUrl}
            alt={post.imageName}
            className="post-image"
            onClick={() => handleImageClick(post.imageUrl!)}
            title="Click to view full size"
          />
        </div>
      )}
      
      <div className="post-content">
        {formatContent(post.content)}
      </div>
    </div>
  );
}
