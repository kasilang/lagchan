interface ImageAdProps {
  imageUrl: string;
  altText: string;
  link?: string;
  caption?: string;
}

export default function ImageAd({ imageUrl, altText, link, caption }: ImageAdProps) {
  const content = (
    <div className="ad-banner" style={{ 
      padding: '5px', 
      textAlign: 'center',
      backgroundColor: '#F0F8FF',
      border: '2px solid #4169E1'
    }}>
      <img 
        src={imageUrl} 
        alt={altText}
        style={{ 
          maxWidth: '100%', 
          maxHeight: '200px', 
          objectFit: 'contain',
          marginBottom: caption ? '5px' : '0'
        }}
      />
      {caption && (
        <div style={{ fontSize: '8pt', color: '#333', fontWeight: 'bold' }}>
          {caption}
        </div>
      )}
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      {content}
    </a>
  ) : content;
}