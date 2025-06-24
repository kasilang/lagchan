import { Link } from "wouter";

export default function Legal() {
  return (
    <div className="retro-container">
      {/* Header */}
      <div className="retro-header">
        <Link href="/">
          <div className="retro-logo" style={{ cursor: 'pointer' }}>lagchan</div>
        </Link>
        <div className="retro-tagline">Legal Information</div>
      </div>

      {/* Navigation */}
      <div className="retro-navbar">
        <Link href="/"><a>[Home]</a></Link>
        <Link href="/faq"><a>[FAQ]</a></Link>
        <Link href="/rules"><a>[Rules]</a></Link>
        <Link href="/contact"><a>[Contact]</a></Link>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', backgroundColor: 'hsl(48, 35%, 89%)', margin: '10px 0', border: '1px solid var(--border)' }}>
        <h2 style={{ color: 'var(--foreground)', marginBottom: '20px' }}>⚖️ Legal Information</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Terms of Service</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            By using lagchan, you agree to follow the rules as outlined in our <Link href="/rules"><a>Rules</a></Link> page. 
            This is an anonymous imageboard operated as a personal project by Ka Silang. 
            Use at your own risk and discretion.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Privacy Policy</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            <strong>We collect minimal data:</strong><br />
            • No user accounts or personal registration required<br />
            • No cookies for tracking purposes<br />
            • Standard server logs for technical maintenance<br />
            • Uploaded images are stored on our servers<br />
            • IP addresses may be logged for spam prevention
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Content Policy</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            • All content is user-generated and posted anonymously<br />
            • Users are responsible for their own posts<br />
            • lagchan does not endorse any views expressed by users<br />
            • Illegal content will be removed and reported to authorities<br />
            • We reserve the right to remove content at our discretion
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Intellectual Property</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            • Users retain rights to their original content<br />
            • By posting, you grant lagchan a non-exclusive license to display your content<br />
            • Do not post copyrighted material without permission<br />
            • Fair use and transformative content principles apply<br />
            • DMCA takedown requests will be processed according to law
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Disclaimer</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            lagchan is provided "as is" without any warranties. We make no guarantees about:
            <br />• Site availability or uptime<br />
            • Data preservation or backup<br />
            • Content accuracy or reliability<br />
            • Protection from offensive or harmful content
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Limitation of Liability</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            Ka Silang and lagchan are not liable for any damages arising from your use of this site, 
            including but not limited to direct, indirect, incidental, or consequential damages.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--foreground)', fontSize: '11pt' }}>Governing Law</h3>
          <p style={{ fontSize: '9pt', lineHeight: '1.4' }}>
            This site operates under Philippine law and international internet freedom principles. 
            Disputes will be resolved through dialectical materialism and revolutionary tribunals.
            (Just kidding about the tribunals... or are we?)
          </p>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#FFFACD', 
          border: '1px solid #F0E68C',
          fontSize: '9pt',
          lineHeight: '1.4'
        }}>
          <strong>⚠️ Important:</strong><br />
          This legal page is provided for transparency but remember - this is a small, independent imageboard 
          run by one person. We operate on good faith and revolutionary principles. 
          <br /><br />
          If you have serious legal concerns, please contact appropriate authorities rather than expecting 
          a formal legal department response.
        </div>

        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#FFE4E1', 
          border: '1px solid #FF6B6B',
          fontSize: '8pt',
          textAlign: 'center'
        }}>
          <strong>Final Warning:</strong> Enjoy mo to habang libre pa. Pag nainis ako, magiging .onion na lang to.
        </div>
      </div>

      {/* Footer */}
      <div className="retro-footer">
        <Link href="/"><a>Home</a></Link> | 
        <Link href="/faq"><a>FAQ</a></Link> | 
        <Link href="/rules"><a>Rules</a></Link> | 
        <Link href="/contact"><a>Contact</a></Link>
      </div>
    </div>
  );
}
