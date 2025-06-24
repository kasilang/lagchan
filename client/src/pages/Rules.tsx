import { Link } from "wouter";

export default function Rules() {
  return (
    <div className="retro-container">
      {/* Header */}
      <div className="retro-header">
        <Link href="/">
          <div className="retro-logo" style={{ cursor: 'pointer' }}>lagchan</div>
        </Link>
        <div className="retro-tagline">Rules & Guidelines</div>
      </div>

      {/* Navigation */}
      <div className="retro-navbar">
        <Link href="/"><a>[Home]</a></Link>
        <Link href="/faq"><a>[FAQ]</a></Link>
        <Link href="/contact"><a>[Contact]</a></Link>
        <Link href="/legal"><a>[Legal]</a></Link>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', backgroundColor: 'hsl(210, 35%, 89%)', margin: '10px 0', border: '1px solid var(--border)' }}>
        <h2 style={{ color: 'var(--foreground)', marginBottom: '20px' }}>📜 Lagchan Rules (Short & Unholy)</h2>
        
        <div style={{ fontSize: '10pt', lineHeight: '1.5' }}>
          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#FFE4E1', border: '1px solid #FF6B6B' }}>
            <strong>No MAGAtards, anarcho-furries, or Facebook centrists.</strong>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#E6FFE6', border: '1px solid #32CD32' }}>
            <strong>Post theory or post hole.</strong>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#FFF8DC', border: '1px solid #DAA520' }}>
            <strong>NSFW allowed. Crime? No. Cringe? Also no.</strong>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#F0F8FF', border: '1px solid #4169E1' }}>
            <strong>Mods are Godless. Don't beg.</strong>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#FFF0F5', border: '1px solid #FF69B4' }}>
            <strong>LARP responsibly.</strong>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#FFE4E1', border: '1px solid #FF6347' }}>
            <strong>Coño posts get gulagged.</strong>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#F5F5DC', border: '1px solid #8B4513' }}>
            <strong>No landlording, no lib whining, no Jesus cosplay.</strong>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#E0FFFF', border: '1px solid #20B2AA' }}>
            <strong>If you cry, you lose.</strong>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#F0FFF0', border: '1px solid #228B22' }}>
            <strong>Touch grass, not your cousin.</strong>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#FFD700', border: '1px solid #FF8C00', textAlign: 'center' }}>
            <strong>Long live the Lag.</strong>
          </div>
        </div>

        <hr style={{ margin: '20px 0', border: '1px solid var(--border)' }} />

        <h3 style={{ color: 'var(--foreground)', fontSize: '12pt', marginBottom: '10px' }}>Additional Guidelines:</h3>
        
        <ul style={{ fontSize: '9pt', lineHeight: '1.4', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>This is an anonymous imageboard - there are no user accounts or persistent identities</li>
          <li style={{ marginBottom: '8px' }}>Images must be under 5MB and in supported formats (JPEG, PNG, GIF, WebP)</li>
          <li style={{ marginBottom: '8px' }}>Use &gt; at the start of a line for greentext formatting</li>
          <li style={{ marginBottom: '8px' }}>Threads that violate rules may be deleted without warning</li>
          <li style={{ marginBottom: '8px' }}>Spam, flooding, and off-topic posts may result in temporary post restrictions</li>
          <li style={{ marginBottom: '8px' }}>Don't post illegal content - this includes but is not limited to CP, doxing, and copyright infringement</li>
          <li style={{ marginBottom: '8px' }}>Quality over quantity - contribute meaningfully to discussions</li>
          <li style={{ marginBottom: '8px' }}>Expect schizo ramblings, Taglish sarcasm, and the occasional NPA LARP</li>
        </ul>

        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#FFFACD', border: '1px solid #F0E68C', fontSize: '9pt', fontStyle: 'italic' }}>
          <strong>Remember:</strong> Post responsibly or get dialectically ratio'd. 
          The moderation team reserves the right to interpret these rules as needed to maintain the quality and character of the community.
        </div>
      </div>

      {/* Footer */}
      <div className="retro-footer">
        <Link href="/"><a>Home</a></Link> | 
        <Link href="/faq"><a>FAQ</a></Link> | 
        <Link href="/contact"><a>Contact</a></Link> | 
        <Link href="/legal"><a>Legal</a></Link>
      </div>
    </div>
  );
}
