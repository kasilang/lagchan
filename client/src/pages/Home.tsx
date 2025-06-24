import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { boardCategories, getCategoryIcon } from "@/lib/boards";
import WelcomePopup from "@/components/WelcomePopup";
import LatestPosts from "@/components/LatestPosts";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="retro-container">
      <WelcomePopup />
      
      {/* Header */}
      <div className="retro-header">
        <div className="retro-logo">lagchan</div>
        <div className="retro-tagline">
          Filipino-English Anonymous Forum - Post responsibly or get dialectically ratio'd
        </div>
      </div>

      {/* Navigation */}
      <div className="retro-navbar">
        <strong>Popular:</strong>
        <Link href="/memes"><a>/memes/</a></Link>
        <Link href="/pol"><a>/pol/</a></Link>
        <Link href="/coal"><a>/coal/</a></Link>
        <Link href="/gem"><a>/gem/</a></Link>
        <span style={{ marginLeft: '20px' }}><strong>Pages:</strong></span>
        <Link href="/faq"><a>FAQ</a></Link>
        <Link href="/rules"><a>Rules</a></Link>
        <Link href="/contact"><a>Contact</a></Link>
        <Link href="/legal"><a>Legal</a></Link>
      </div>

      {/* Top Banner Ad */}
      <AdBanner
        title="🎯 SPONSORED:"
        content="Revolutionary Theory Books - 50% OFF! Das Kapital, State and Revolution, Wretched of the Earth"
        link="#"
        linkText="ORDER NOW!"
      />

      <div className="retro-main">
        {/* Left Column: Board Groups */}
        <div className="retro-left-column">
          {Object.entries(boardCategories).map(([category, boards]) => (
            <div key={category} className="board-group">
              <div className="board-group-header">
                {getCategoryIcon(category)} {category}
              </div>
              <div className="board-list">
                {boards.map((board) => (
                  <div key={board.slug} className="board-item">
                    <Link href={`/${board.slug}`}>
                      <a>/{board.slug}/</a>
                    </Link>
                    <span className="board-desc"> - {board.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Latest Posts & Ads */}
        <div className="retro-right-column">
          {/* Site Stats */}
          <div className="stats-box">
            <div className="stats-header">📊 Site Statistics</div>
            <div>Total Posts: <strong>{stats?.totalPosts || 0}</strong></div>
            <div>Active Threads: <strong>{stats?.activeThreads || 0}</strong></div>
            <div>PPH (Posts/Hour): <strong>69</strong></div>
            <div>Online Now: <strong>{stats?.onlineUsers || 0}</strong> anons</div>
          </div>

          {/* Advertisement */}
          <AdBanner
            title="🎮 RETRO GAME EMULATORS"
            content="Play classic NES, SNES, Genesis games in your browser! No downloads needed - 100% FREE!"
            link="#"
            linkText="PLAY NOW!"
            backgroundColor="#FF6B6B"
            titleColor="white"
            linkColor="#FF6B6B"
          />

          {/* Latest Posts */}
          <LatestPosts />

          {/* News & Announcements */}
          <div className="news-section">
            <div className="news-header">📢 News & Updates</div>
            <div className="news-content">
              <div style={{ marginBottom: '10px', fontSize: '8pt' }}>
                <strong>Dec 23:</strong> New /qft/ and /st/ boards added for physics discussions!
              </div>
              <div style={{ marginBottom: '10px', fontSize: '8pt' }}>
                <strong>Dec 20:</strong> Fixed image upload bug. PNG files should work properly now.
              </div>
              <div style={{ fontSize: '8pt' }}>
                <strong>Dec 18:</strong> Added real-time chat to /chat/ board. Try it out!
              </div>
            </div>
          </div>

          {/* Advertisement 2 */}
          <AdBanner
            title="💰 CRYPTO REVOLUTION"
            content="MARXCOIN - The People's Cryptocurrency! Decentralize the means of production!"
            link="#"
            linkText="MINE NOW!"
            backgroundColor="#FFE4B5"
            titleColor="#8B4513"
            linkColor="#8B4513"
          />

          {/* Rules Reminder */}
          <div className="news-section">
            <div className="news-header">📜 Rules Reminder</div>
            <div className="news-content" style={{ fontSize: '8pt' }}>
              <div style={{ marginBottom: '5px' }}>• No MAGAtards, anarcho-furries, or Facebook centrists</div>
              <div style={{ marginBottom: '5px' }}>• Post theory or post hole</div>
              <div style={{ marginBottom: '5px' }}>• NSFW allowed. Crime? No. Cringe? Also no.</div>
              <div style={{ marginBottom: '5px' }}>• If you cry, you lose</div>
              <div>• Touch grass, not your cousin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="retro-footer">
        <div style={{ marginBottom: '5px' }}>
          <strong>lagchan</strong> - User-run, self-coded Filipino-English forum for posting, overposting, and occasionally, class struggle.
        </div>
        <div>
          <Link href="/faq"><a>FAQ</a></Link> | 
          <Link href="/rules"><a>Rules</a></Link> | 
          <Link href="/contact"><a>Contact</a></Link> | 
          <Link href="/legal"><a>Legal</a></Link> | 
          <a href="#statistics">Statistics</a>
        </div>
        <div style={{ marginTop: '5px', fontSize: '7pt' }}>
          Threads range from theory debates to full-blown meme psychosis. Expect schizo ramblings, Taglish sarcasm, and the occasional NPA LARP.<br />
          <em>Long live the Lag.</em>
        </div>
      </div>
    </div>
  );
}
