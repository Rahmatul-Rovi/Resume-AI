export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
      <div className="max-w-6xl mx-auto px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                    stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-base font-black"
                style={{ background: 'linear-gradient(135deg, #e2d9f3, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ResumeAI
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              AI দিয়ে তোমার resume কে smarter করো। বাংলাদেশের job seekers দের জন্য তৈরি।
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'f', '▶'].map((icon) => (
                <div key={icon}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm cursor-pointer transition-colors hover:bg-white/15"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider"
              style={{ color: 'rgba(255,255,255,0.6)' }}>Product</h4>
            <div className="space-y-3">
              {['Features', 'How it Works', 'Pricing', 'Changelog', 'Roadmap'].map((item) => (
                <div key={item}
                  className="text-sm transition-colors hover:text-white cursor-pointer"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider"
              style={{ color: 'rgba(255,255,255,0.6)' }}>Company</h4>
            <div className="space-y-3">
              {['About Us', 'Blog', 'Careers', 'Press Kit', 'Contact'].map((item) => (
                <div key={item}
                  className="text-sm transition-colors hover:text-white cursor-pointer"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider"
              style={{ color: 'rgba(255,255,255,0.6)' }}>Legal</h4>
            <div className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'GDPR'].map((item) => (
                <div key={item}
                  className="text-sm transition-colors hover:text-white cursor-pointer"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2025 ResumeAI · All rights reserved · Made with ❤️ in Bangladesh
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <span key={item}
                className="text-xs cursor-pointer hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}