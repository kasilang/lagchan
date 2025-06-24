interface AdBannerProps {
  title: string;
  content: string;
  link: string;
  linkText: string;
  backgroundColor?: string;
  titleColor?: string;
  linkColor?: string;
}

export default function AdBanner({ 
  title, 
  content, 
  link, 
  linkText, 
  backgroundColor, 
  titleColor, 
  linkColor 
}: AdBannerProps) {
  const bannerStyle = backgroundColor ? {
    backgroundColor,
    color: titleColor || 'inherit'
  } : {};

  return (
    <div className="ad-banner" style={bannerStyle}>
      {backgroundColor && titleColor ? (
        <div style={{ 
          backgroundColor: titleColor === 'white' ? backgroundColor : titleColor,
          color: titleColor === 'white' ? 'white' : 'white',
          padding: '5px', 
          marginBottom: '5px' 
        }}>
          <strong>{title}</strong>
        </div>
      ) : (
        <strong>{title}</strong>
      )}
      <div style={{ fontSize: '8pt', marginTop: backgroundColor ? '0' : '5px' }}>
        {content}<br />
        <a 
          href={link} 
          style={{ 
            color: linkColor || 'var(--foreground)', 
            fontWeight: 'bold' 
          }}
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}
