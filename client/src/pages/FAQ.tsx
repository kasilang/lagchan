import { Link } from "wouter";

export default function FAQ() {
  return (
    <div className="retro-container">
      {/* Header */}
      <div className="retro-header">
        <Link href="/">
          <div className="retro-logo" style={{ cursor: 'pointer' }}>lagchan</div>
        </Link>
        <div className="retro-tagline">Frequently Asked Questions</div>
      </div>

      {/* Navigation */}
      <div className="retro-navbar">
        <Link href="/"><a>[Home]</a></Link>
        <Link href="/rules"><a>[Rules]</a></Link>
        <Link href="/contact"><a>[Contact]</a></Link>
        <Link href="/legal"><a>[Legal]</a></Link>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', backgroundColor: 'hsl(210, 35%, 89%)', margin: '10px 0', border: '1px solid var(--border)' }}>
        <h2 style={{ color: 'var(--foreground)', marginBottom: '20px' }}>❓ Frequently Asked Questions</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>What is lagchan?</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Lagchan is a user-run, self-coded Filipino-English imageboard for posting, overposting, and occasionally, class struggle. 
            We're an anonymous forum where threads range from theory debates to full-blown meme psychosis.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Who runs this site?</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Ka Silang - sole proprietor, site admin, webdev, at designated theorist-in-residence. 
            Mahal niya ang dialectical materialism at pusa. Yung literal at yung metaphorical.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>How do I post?</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Just click on any board, fill out the form at the top, and hit submit. You can post text, images, or both. 
            Everyone posts anonymously as "Anonymous".
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>What file types can I upload?</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            JPEG, PNG, GIF, and WebP images up to 5MB. No executable files, archives, or other file types allowed.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>How do I greentext?</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Start any line with a greater-than symbol (&gt;) and it will appear in green text. 
            This is commonly used for quotes, stories, or implications.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Why can't I see user accounts or profiles?</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            This is an anonymous imageboard. There are no user accounts, profiles, or persistent identities. 
            Everyone posts as "Anonymous" - that's the whole point!
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>What does "dialectically ratio'd" mean?</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Getting owned through superior dialectical analysis and material understanding. 
            It's when someone uses better theory to completely dismantle your argument.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Is this site going to become .onion only?</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Only if Ka Silang gets annoyed. Enjoy it while it's still on the clearnet!
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="retro-footer">
        <Link href="/"><a>Home</a></Link> | 
        <Link href="/rules"><a>Rules</a></Link> | 
        <Link href="/contact"><a>Contact</a></Link> | 
        <Link href="/legal"><a>Legal</a></Link>
      </div>
    </div>
  );
}
