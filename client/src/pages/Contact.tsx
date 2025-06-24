import { Link } from "wouter";

export default function Contact() {
  return (
    <div className="retro-container">
      {/* Header */}
      <div className="retro-header">
        <Link href="/">
          <div className="retro-logo" style={{ cursor: 'pointer' }}>lagchan</div>
        </Link>
        <div className="retro-tagline">Contact Information</div>
      </div>

      {/* Navigation */}
      <div className="retro-navbar">
        <Link href="/"><a>[Home]</a></Link>
        <Link href="/faq"><a>[FAQ]</a></Link>
        <Link href="/rules"><a>[Rules]</a></Link>
        <Link href="/legal"><a>[Legal]</a></Link>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', backgroundColor: 'hsl(210, 35%, 89%)', margin: '10px 0', border: '1px solid var(--border)' }}>
        <h2 style={{ color: 'var(--foreground)', marginBottom: '20px' }}>📞 Contact lagchan</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Site Administrator</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            <strong>Ka Silang</strong><br />
            Sole proprietor, site admin, webdev, at designated theorist-in-residence
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>General Inquiries</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            For general questions, feedback, or suggestions about the site, you can try posting on <Link href="/q"><a>/q/</a></Link> (Questions & Answers) 
            or <Link href="/gen"><a>/gen/</a></Link> (General Discussions).
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Technical Issues</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Experiencing bugs or technical problems? Post about them on <Link href="/q"><a>/q/</a></Link> with as much detail as possible. 
            Ka Silang monitors these boards regularly.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Rule Violations</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Since this is an anonymous imageboard, there's no direct reporting system. 
            However, community self-moderation through dialectical discourse is encouraged. 
            Serious violations will be handled by Ka Silang as they are discovered.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Philosophical Discussions</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Want to engage with the site's theoretical framework? Head to <Link href="/marx"><a>/marx/</a></Link> for Marxist-Leninist discussions 
            or <Link href="/d"><a>/d/</a></Link> for general debates.
          </p>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#FFE4E1', 
          border: '1px solid #FF6B6B',
          fontSize: '9pt',
          lineHeight: '1.4'
        }}>
          <strong>⚠️ Important Notice:</strong><br />
          This site operates on anarchist principles regarding communication. There is no formal customer service, helpdesk, or guaranteed response time. 
          Ka Silang will respond when they feel like it, or when the dialectical conditions are right. 
          <br /><br />
          Remember: Mods are Godless. Don't beg.
        </div>

        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#F0FFF0', 
          border: '1px solid #32CD32',
          fontSize: '8pt',
          fontStyle: 'italic',
          textAlign: 'center'
        }}>
          "Mahal ko ang dialectical materialism at pusa. Yung literal at yung metaphorical."<br />
          - Ka Silang
        </div>
      </div>

      {/* Footer */}
      <div className="retro-footer">
        <Link href="/"><a>Home</a></Link> | 
        <Link href="/faq"><a>FAQ</a></Link> | 
        <Link href="/rules"><a>Rules</a></Link> | 
        <Link href="/legal"><a>Legal</a></Link>
      </div>
    </div>
  );
}
