import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { boardCategories, getCategoryIcon } from "@/lib/boards";
import WelcomePopup from "@/components/WelcomePopup";
import LatestPosts from "@/components/LatestPosts";
import AdBanner from "@/components/AdBanner";
import ImageAd from "@/components/ImageAd";

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
        <Link href="/memes">/memes/</Link>
        <Link href="/pol">/pol/</Link>
        <Link href="/coal">/coal/</Link>
        <Link href="/gem">/gem/</Link>
        <span style={{ marginLeft: '20px' }}><strong>Pages:</strong></span>
        <Link href="/faq">FAQ</Link>
        <Link href="/rules">Rules</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/legal">Legal</Link>
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
                      /{board.slug}/
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

          {/* Image Advertisement */}
          <ImageAd
            imageUrl="https://i.imgur.com/CzXTtJV.jpg"
            altText="Cursed meme ad"
            caption="WHEN THE IMPOSTER IS SUS 😳"
          />

          {/* Text Advertisement */}
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

          {/* Cursed Image Ad */}
          <ImageAd
            imageUrl="https://i.imgur.com/7drHiqr.gif"
            altText="Spinning frog"
            caption="IT IS WEDNESDAY MY DUDES"
          />

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

          {/* Random Person Selfie Ad */}
          <ImageAd
            imageUrl="https://i.imgur.com/kPqvjqP.png"
            altText="Random selfie"
            caption="THIS COULD BE YOU ANON"
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
          <Link href="/faq">FAQ</Link> | 
          <Link href="/rules">Rules</Link> | 
          <Link href="/contact">Contact</Link> | 
          <Link href="/legal">Legal</Link> | 
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
