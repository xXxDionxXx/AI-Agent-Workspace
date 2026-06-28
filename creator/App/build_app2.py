import os

path = r"c:\AI-Agent-Workspace\creator\App\index.html"
html = []

# --- 1. HEAD & CSS ---
html.append(r"""<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nick | Financetry — Creator Studio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #0B1024; --bg2: #182350; --bg3: #1F2D61; --bg4: #273775;
  --card: rgba(24,35,80,0.85); --card2: #1F2D61;
  --accent: #AFD2FA; --accent-d: #8EB8E8; --accent-glow: rgba(175,210,250,0.15);
  --gold: #B9915E; --gold-d: #9A7649; --gold-glow: rgba(185,145,94,0.15);
  --green: #2DD4A0; --green-glow: rgba(45,212,160,0.12);
  --red: #FF5C7A;
  --tofu: #AFD2FA; --mofu: #B9915E; --bofu: #2DD4A0;
  --text: #FEFAEF; --text2: #D1CFC7; --text3: #A6A59E;
  --border: rgba(255,255,255,0.08); --border2: rgba(255,255,255,0.15);
  --radius: 12px; --radius-sm: 8px; --radius-lg: 16px;
  --shadow: 0 8px 32px rgba(0,0,0,0.4);
  --tr: all 0.25s cubic-bezier(0.4,0,0.2,1);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Sarabun', sans-serif; background-color: var(--bg); color: var(--text); line-height: 1.6; height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
h1, h2, h3, h4 { font-family: 'Inter', sans-serif; }
a { color: var(--accent); text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; transition: var(--tr); }

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--bg4); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

.header { height: 64px; background: var(--bg2); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; flex-shrink: 0; z-index: 100; }
.brand { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 1.25rem; color: var(--text); display: flex; align-items: center; gap: 12px; }
.brand-icon { width: 32px; height: 32px; background: var(--accent); color: var(--bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; }

.nav-tabs { display: flex; gap: 8px; overflow-x: auto; }
.nav-tab { padding: 8px 16px; border-radius: var(--radius); font-weight: 600; font-size: 0.9rem; color: var(--text2); display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.nav-tab:hover { background: var(--bg3); color: var(--text); }
.nav-tab.active { background: var(--accent-glow); color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }

.header-right { display: flex; align-items: center; gap: 16px; }
.save-status { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text3); }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 8px var(--green-glow); }
.btn-icon { width: 36px; height: 36px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; background: var(--bg3); color: var(--text); }
.btn-icon:hover { background: var(--bg4); }

.main-area { flex: 1; display: flex; overflow: hidden; position: relative; }
.panel { flex: 1; display: none; flex-direction: column; overflow-y: auto; padding: 24px 32px; }
.panel.active { display: flex; }
.container { max-width: 1000px; margin: 0 auto; width: 100%; padding-bottom: 80px; }

.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: 24px; backdrop-filter: blur(12px); box-shadow: var(--shadow); overflow: hidden; transition: var(--tr); }
.card-hd { padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none; }
.card-hd:hover { background: rgba(255,255,255,0.02); }
.card-title { display: flex; align-items: center; gap: 12px; font-size: 1.1rem; font-weight: 700; font-family: 'Inter', sans-serif; }
.step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--bg4); color: var(--text); display: flex; align-items: center; justify-content: center; font-size: 0.9rem; }
.step-num.done { background: var(--accent); color: var(--bg); }
.card-body { padding: 0 24px 24px 24px; display: none; }
.card.open .card-body { display: block; }
.card.open .card-icon { transform: rotate(180deg); }

.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { padding: 8px 16px; border-radius: 20px; background: var(--bg3); border: 1px solid var(--border); font-size: 0.95rem; font-weight: 500; }
.chip:hover { background: var(--bg4); border-color: var(--border2); }
.chip.active { background: var(--accent-glow); color: var(--accent); border-color: var(--accent); }

.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.f-card { background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; text-align: center; cursor: pointer; transition: var(--tr); position: relative; }
.f-card:hover { transform: translateY(-2px); border-color: var(--border2); }
.f-card.active.tofu { background: rgba(175,210,250,0.1); border-color: var(--tofu); color: var(--tofu); }
.f-card.active.mofu { background: rgba(185,145,94,0.1); border-color: var(--mofu); color: var(--mofu); }
.f-card.active.bofu { background: rgba(45,212,160,0.1); border-color: var(--bofu); color: var(--bofu); }
.f-title { font-weight: 700; font-size: 1.1rem; margin-bottom: 4px; font-family: 'Inter', sans-serif; }
.f-desc { font-size: 0.85rem; color: var(--text2); }
.f-card.active.tofu .f-desc { color: var(--tofu); }
.f-card.active.mofu .f-desc { color: var(--mofu); }
.f-card.active.bofu .f-desc { color: var(--bofu); }

.btn-refresh { position: absolute; top: 8px; right: 8px; background: var(--bg4); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: var(--text); opacity: 0; transition: var(--tr); }
.f-card:hover .btn-refresh { opacity: 1; }
.btn-refresh:hover { background: var(--accent); color: var(--bg); transform: rotate(180deg); }

.selectable-list { display: flex; flex-direction: column; gap: 8px; }
.selectable-item { padding: 12px 16px; background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius-sm); display: flex; align-items: center; gap: 12px; cursor: pointer; transition: var(--tr); }
.selectable-item:hover { background: var(--bg4); border-color: var(--border2); }
.selectable-item.active { background: var(--accent-glow); border-color: var(--accent); }
.s-icon { font-size: 1.2rem; }
.s-content { flex: 1; }
.s-title { font-weight: 600; margin-bottom: 2px; }
.s-desc { font-size: 0.85rem; color: var(--text3); }

input[type="text"], textarea, select { width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px 16px; color: var(--text); font-family: inherit; font-size: 1rem; transition: var(--tr); }
input[type="text"]:focus, textarea:focus, select:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-glow); }
textarea { resize: vertical; min-height: 120px; line-height: 1.6; }

.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 20px; border-radius: var(--radius-sm); font-weight: 600; font-size: 0.95rem; background: var(--bg4); color: var(--text); }
.btn:hover { background: var(--bg3); filter: brightness(1.1); }
.btn-primary { background: var(--accent); color: var(--bg); }
.btn-primary:hover { background: var(--accent-d); }
.btn-gold { background: var(--gold); color: var(--bg); }
.btn-gold:hover { background: var(--gold-d); }

.data-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
.data-table th, .data-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid var(--border); }
.data-table th { font-weight: 600; color: var(--text2); font-size: 0.9rem; background: var(--bg3); }
.data-table tr:hover td { background: rgba(255,255,255,0.02); }

#toast-container { position: fixed; bottom: 80px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
.toast { background: var(--bg2); border: 1px solid var(--border); padding: 12px 20px; border-radius: var(--radius-sm); box-shadow: var(--shadow); display: flex; align-items: center; gap: 12px; animation: slideIn 0.3s cubic-bezier(0.4,0,0.2,1); }
.toast.out { animation: slideOut 0.3s cubic-bezier(0.4,0,0.2,1) forwards; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }

.hidden { display: none !important; }
.text-center { text-align: center; }
.mt-4 { margin-top: 16px; }
.mb-4 { margin-bottom: 16px; }

/* Sticky Player */
.sticky-player { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(24,35,80,0.95); backdrop-filter: blur(12px); border-top: 1px solid var(--border); padding: 16px 24px; display: flex; align-items: center; gap: 20px; z-index: 1000; transform: translateY(100%); transition: var(--tr); }
.sticky-player.show { transform: translateY(0); }
.play-btn { width: 48px; height: 48px; border-radius: 50%; background: var(--accent); color: var(--bg); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.progress-container { height: 6px; background: var(--bg4); border-radius: 3px; cursor: pointer; position: relative; flex: 1; }
.progress-fill { position: absolute; top: 0; left: 0; bottom: 0; background: var(--accent); border-radius: 3px; width: 0%; pointer-events: none; }
.time-display { font-size: 0.8rem; color: var(--text3); font-family: 'Inter', sans-serif; }

/* Teleprompter */
.teleprompter { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #000; z-index: 9999; display: none; flex-direction: column; }
.teleprompter.active { display: flex; }
.tp-header { height: 64px; background: #111; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; border-bottom: 1px solid #333; }
.tp-controls { display: flex; gap: 16px; align-items: center; }
.tp-content-wrap { flex: 1; overflow: hidden; position: relative; display: flex; justify-content: center; }
.tp-content { width: 100%; max-width: 900px; padding: 60vh 20px; font-size: 4rem; font-weight: 700; line-height: 1.5; color: white; text-align: center; transition: transform 0.1s linear; white-space: pre-wrap; }
.tp-marker { position: absolute; top: 50%; left: 0; right: 0; height: 4px; background: rgba(255,0,0,0.5); transform: translateY(-50%); pointer-events: none; }

.chk-item { display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
.chk-item input { width:20px; height:20px; accent-color:var(--accent); }
</style>
</head>
<body>
""")

# --- 2. HEADER ---
html.append(r"""
<div class="header">
  <div class="brand"><div class="brand-icon">F</div>Financetry Studio</div>
  <div class="nav-tabs">
    <button class="nav-tab active" onclick="switchPanel('pre', this)">🎬 Pre-Production</button>
    <button class="nav-tab" onclick="switchPanel('vis', this)">👁 Visualization</button>
    <button class="nav-tab" onclick="switchPanel('audio', this)">🎵 Audio</button>
    <button class="nav-tab" onclick="switchPanel('prod', this)">🎥 Production</button>
    <button class="nav-tab" onclick="switchPanel('post', this)">✂️ Post-Production</button>
  </div>
  <div class="header-right">
    <input type="password" id="api-key" placeholder="🔑 Gemini API Key" onchange="svS()" style="width:160px; padding:6px 12px; font-size:0.8rem; background:var(--bg3); border:1px solid var(--border); color:var(--text); border-radius:var(--radius-sm);" title="ใส่ API Key ของ Gemini (ฟรี) เพื่อใช้งานระบบ AI คิดสด">
    <div class="save-status"><div class="dot" id="save-dot"></div> Saved</div>
    <button class="btn-icon" title="Clear All" onclick="clearData()" style="color:var(--text3)">🗑️</button>
  </div>
</div>
""")

# --- 3. PRE-PRODUCTION ---
html.append(r"""
<div class="main-area">
  <!-- 🎬 PRE-PRODUCTION -->
  <div class="panel active" id="panel-pre">
    <div class="container">
      <h2>🎬 Script Writing Workflow</h2><br>
      
      <!-- ICP -->
      <div class="card open" id="c-1">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title"><div class="step-num">1</div> Target Audience (ICP)</div>
          <div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="selectable-list" id="icp-list"></div>
        </div>
      </div>

      <!-- Funnel Stage -->
      <div class="card" id="c-2">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title"><div class="step-num">2</div> Funnel Stage</div>
          <div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="grid-3" id="funnel-grid"></div>
        </div>
      </div>
      
      <!-- Format -->
      <div class="card" id="c-format">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title"><div class="step-num">3</div> Content Format</div>
          <div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="grid-3" id="format-grid"></div>
        </div>
      </div>

      <!-- Script Structure -->
      <div class="card" id="c-struct">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title"><div class="step-num">4</div> Script Structure</div>
          <div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="selectable-list" id="structure-list"></div>
        </div>
      </div>

      <!-- Core Values -->
      <div class="card" id="c-core">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title"><div class="step-num">5</div> Core Values (AI Assisted)</div>
          <div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div style="font-size:0.9rem; color:var(--text3); margin-bottom:12px;">วิเคราะห์และสุ่ม Core Values อิงตาม Funnel Stage ที่คุณเลือก</div>
          <div class="grid-3" id="cv-grid">
            <div class="text-center" style="grid-column: span 3; color:var(--text3)">กรุณาเลือก Funnel Stage ก่อน</div>
          </div>
        </div>
      </div>
      
      <!-- Hooks -->
      <div class="card" id="c-hook">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title"><div class="step-num">6</div> Verbal Hook & Re-Hook</div>
          <div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <h4 style="margin-bottom:8px; color:var(--accent);">🗣 Verbal Hook</h4>
          <div class="selectable-list mb-4" id="vhook-list"></div>
          
          <h4 style="margin-bottom:8px; color:var(--gold);">🎣 Re-Hook (จุดดึงความสนใจกลางคลิป)</h4>
          <div class="selectable-list" id="rehook-list"></div>
        </div>
      </div>
      
      <!-- CTA -->
      <div class="card" id="c-cta">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title"><div class="step-num">7</div> Call to Action (CTA)</div>
          <div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="selectable-list" id="cta-list"></div>
        </div>
      </div>

      <!-- Master Script -->
      <div class="card" id="c-script">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title"><div class="step-num">8</div> Master Script</div>
          <div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div style="display:flex; gap:16px;">
            <textarea id="master-script" style="flex:1; min-height:300px;" placeholder="พิมพ์หรือ Generate สคริปต์ที่นี่..." oninput="svS()"></textarea>
            <div style="width:200px; display:flex; flex-direction:column; gap:12px;">
              <button class="btn btn-gold" onclick="generateScriptText()">✨ Auto Generate</button>
              <button class="btn btn-primary" onclick="openTP()">📺 Teleprompter</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
""")

# --- 4. VISUALIZATION ---
html.append(r"""
  <!-- 👁 VISUALIZATION -->
  <div class="panel" id="panel-vis">
    <div class="container">
      <h2>👁 Visualization Workflow</h2><br>
      
      <!-- Visual Hook -->
      <div class="card open">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title">1. Visual Hook (3 วิแรก)</div><div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="grid-2" id="visual-hook-list"></div>
        </div>
      </div>
      
      <!-- Cutting on Motion -->
      <div class="card open">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title">2. Cutting on Motion & Framing</div><div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div style="background:var(--bg3); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--border);">
            <h4 style="color:var(--accent); margin-bottom:8px;">กฎของช่อง: Dynamic Shot Variation</h4>
            <p style="font-size:0.9rem; color:var(--text2); margin-bottom:16px;">เปลี่ยนขนาดภาพ (Wide, Medium, Close-up) และมุมกล้อง (High/Low/Eye-level) โดยอาศัยจังหวะการเคลื่อนไหวของร่างกาย (Cutting on Motion) เพื่อความต่อเนื่อง</p>
            
            <div class="selectable-list">
              <div class="chk-item"><input type="checkbox" id="chk-cm1" onchange="svS()"> <label for="chk-cm1">ใช้การสับมือ หรือขยับตัว เป็นจุดเชื่อมเปลี่ยน Shot Size</label></div>
              <div class="chk-item"><input type="checkbox" id="chk-cm2" onchange="svS()"> <label for="chk-cm2">เปลี่ยนมุมกล้องเพื่อเน้นความสำคัญ (Low-Angle = ความน่าเชื่อถือ)</label></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Optional Enhancements -->
      <div class="card open">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title">3. Visual Enhancements (MGFX / VFX)</div><div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="chips" id="vfx-list"></div>
        </div>
      </div>
      
    </div>
  </div>
""")

# --- 5. AUDIO ---
html.append(r"""
  <!-- 🎵 AUDIO -->
  <div class="panel" id="panel-audio">
    <div class="container">
      <h2>🎵 Audio & Sound Design</h2><br>
      
      <!-- Audio Hook -->
      <div class="card open">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title">1. Audio Hook (Cinematic & SFX)</div><div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="chips" id="audio-hook-list"></div>
        </div>
      </div>
      
      <!-- BGM -->
      <div class="card open">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title">2. Background Music (BGM)</div><div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="chips mb-4" id="bgm-moods"></div>
          <div class="selectable-list" id="bgm-tracks"></div>
        </div>
      </div>
      
      <!-- Conclusion -->
      <div class="card open">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title">3. Conclusion Music</div><div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="chips" id="audio-conc-list"></div>
        </div>
      </div>
      
    </div>
  </div>
""")

# --- 6. PRODUCTION ---
html.append(r"""
  <!-- 🎥 PRODUCTION -->
  <div class="panel" id="panel-prod">
    <div class="container">
      <h2>🎥 Production & Shooting</h2><br>
      
      <!-- Wardrobe -->
      <div class="card open">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title">1. Wardrobe Selection System</div><div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="grid-2">
            <div>
              <h4 style="margin-bottom:8px;">Location Setup</h4>
              <select id="loc-select" onchange="updateWardrobe(); svS()">
                <option value="">-- เลือกสถานที่ --</option>
              </select>
              <div id="loc-desc" style="margin-top:12px; font-size:0.85rem; color:var(--text2); background:var(--bg3); padding:12px; border-radius:var(--radius-sm);"></div>
            </div>
            <div>
              <h4 style="margin-bottom:8px;">คำแนะนำสีเสื้อ (Visual Contrast)</h4>
              <div id="wardrobe-rec" style="font-size:0.9rem; color:var(--accent); background:var(--accent-glow); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--accent); min-height:80px;">
                เลือกสถานที่ก่อนเพื่อดูคำแนะนำสีเสื้อ
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Settings -->
      <div class="card open">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title">2. Camera & Audio Checklist</div><div class="card-icon">▼</div>
        </div>
        <div class="card-body">
          <div class="grid-2">
            <div>
              <h4 style="margin-bottom:8px; color:var(--tofu);">📷 Camera Settings</h4>
              <div class="selectable-list" id="cam-chk"></div>
            </div>
            <div>
              <h4 style="margin-bottom:8px; color:var(--mofu);">🎙 Audio (DJI Mic 2)</h4>
              <div class="selectable-list">
                <div class="chk-item"><input type="checkbox" id="chk-a1" onchange="svS()"> <label for="chk-a1">ติดปกเสื้อห่างปาก 1 ฝ่ามือ</label></div>
                <div class="chk-item"><input type="checkbox" id="chk-a2" onchange="svS()"> <label for="chk-a2">เปิด Noise Cancellation (เมื่ออยู่ Outdoor)</label></div>
                <div class="chk-item"><input type="checkbox" id="chk-a3" onchange="svS()"> <label for="chk-a3">ตั้ง Gain Level: -6 dB ถึง -12 dB</label></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Shot List -->
      <div class="card open">
        <div class="card-hd" onclick="this.parentElement.classList.toggle('open')">
          <div class="card-title">3. Master Shot List Generation</div>
          <button class="btn btn-primary" style="padding:4px 12px; font-size:0.85rem;" onclick="event.stopPropagation(); genShotList()">⚡ Generate</button>
        </div>
        <div class="card-body">
          <table class="data-table">
            <thead><tr><th>#</th><th>Description</th><th>Size</th><th>Angle</th><th>Movement / Notes</th></tr></thead>
            <tbody id="shot-list-body">
              <tr><td colspan="5" class="text-center" style="color:var(--text3)">กดปุ่ม Generate เพื่อวิเคราะห์จากโครงสร้าง Pre-Prod</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
""")

# --- 7. POST-PRODUCTION ---
html.append(r"""
  <!-- ✂️ POST-PRODUCTION -->
  <div class="panel" id="panel-post">
    <div class="container">
      <h2>✂️ Post-Production Pipeline</h2><br>
      
      <div class="grid-3">
        <!-- Color -->
        <div class="card open">
          <div class="card-hd"><div class="card-title" style="font-size:1rem;">1. Color Pipeline</div></div>
          <div class="card-body">
            <div class="selectable-list" id="post-color"></div>
          </div>
        </div>
        <!-- Assembly -->
        <div class="card open">
          <div class="card-hd"><div class="card-title" style="font-size:1rem;">2. Visual Assembly</div></div>
          <div class="card-body">
            <div class="selectable-list">
              <div class="chk-item"><input type="checkbox" id="chk-v1" onchange="svS()"> <label for="chk-v1">ร้อยเรียง A-Roll สลับ B-Roll</label></div>
              <div class="chk-item"><input type="checkbox" id="chk-v2" onchange="svS()"> <label for="chk-v2">ตัดด้วย Cutting on Motion</label></div>
              <div class="chk-item"><input type="checkbox" id="chk-v3" onchange="svS()"> <label for="chk-v3">ซ้อน MGFX / กราฟิก</label></div>
            </div>
          </div>
        </div>
        <!-- Audio Mix -->
        <div class="card open">
          <div class="card-hd"><div class="card-title" style="font-size:1rem;">3. Audio Mixing</div></div>
          <div class="card-body">
            <div class="selectable-list" id="post-audio"></div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>
""")

# --- 8. GLOBAL COMPONENTS (Teleprompter, Audio Player) ---
html.append(r"""
<!-- Teleprompter Overlay -->
<div class="teleprompter" id="tp-overlay">
  <div class="tp-header">
    <div style="font-weight:700; font-family:'Inter',sans-serif; color:white;">Teleprompter</div>
    <div class="tp-controls">
      <div style="display:flex; align-items:center; gap:8px;">
        <button class="btn" style="padding:4px 8px;" onclick="adjTpSpeed(-1)">-</button>
        <span id="tp-speed-val" style="color:white; width:30px; text-align:center;">3</span>
        <button class="btn" style="padding:4px 8px;" onclick="adjTpSpeed(1)">+</button>
      </div>
      <button class="btn btn-primary" id="tp-play-btn" onclick="toggleTpPlay()">▶ Play</button>
      <button class="btn" style="background:#333; color:white;" onclick="closeTP()">✕ Close</button>
    </div>
  </div>
  <div class="tp-content-wrap" id="tp-wrap">
    <div class="tp-marker"></div>
    <div class="tp-content" id="tp-text"></div>
  </div>
</div>

<!-- Sticky Player -->
<div class="sticky-player" id="player-bar">
  <audio id="audio-el"></audio>
  <button class="play-btn" id="play-btn" onclick="togglePlay()">▶</button>
  <div style="flex:1;">
    <div style="font-weight:600; margin-bottom:4px;" id="track-name">No track selected</div>
    <div style="display:flex; align-items:center; gap:12px;">
      <span class="time-display" id="time-cur">0:00</span>
      <div class="progress-container" id="progress-bg" onclick="seekAudio(event)">
        <div class="progress-fill" id="progress-fill-audio"></div>
      </div>
      <span class="time-display" id="time-tot">0:00</span>
    </div>
  </div>
</div>

<div id="toast-container"></div>
""")

# --- 9. JAVASCRIPT LOGIC ---
html.append(r"""
<script src="_knowledge.js"></script>
<script src="_adb.js"></script>
<script>
const KB = window.KnowledgeBase;
let S = JSON.parse(localStorage.getItem('cs_db') || '{}');

function svS(){
  const els = document.querySelectorAll('input[type="checkbox"]');
  els.forEach(el => { S[el.id] = el.checked; });
  S.script = document.getElementById('master-script').value;
  const ak = document.getElementById('api-key');
  if(ak) S.geminiKey = ak.value;
  localStorage.setItem('cs_db', JSON.stringify(S));
  showSaved();
}

function showSaved(){
  const d = document.getElementById('save-dot');
  if(!d) return;
  d.style.background='white'; d.style.boxShadow='none';
  setTimeout(()=>{ d.style.background='var(--green)'; d.style.boxShadow='0 0 8px var(--green-glow)'; }, 300);
}

function switchPanel(pid, el){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('panel-'+pid).classList.add('active');
  if(el) el.classList.add('active');
}

function initUI(){
  const ak = document.getElementById('api-key');
  if(ak && S.geminiKey) ak.value = S.geminiKey;

  // ICP
  document.getElementById('icp-list').innerHTML = KB.ICP.map(i=>
    `<div class="selectable-item ${S.icp===i.id?'active':''}" onclick="setVal('icp','${i.id}'); renderIdeas()">
      <div class="s-icon">💼</div><div class="s-content"><div class="s-title">${i.title}</div><div class="s-desc">${i.desc}</div></div>
    </div>`
  ).join('');

  // Funnel
  document.getElementById('funnel-grid').innerHTML = KB.Funnel.map(f=>
    `<div class="f-card ${f.id.toLowerCase()} ${S.funnel===f.id?'active':''}" onclick="setVal('funnel','${f.id}'); renderIdeas()">
      <div class="f-title">${f.title}</div><div class="f-desc">${f.desc}</div>
    </div>`
  ).join('');

  // Format
  document.getElementById('format-grid').innerHTML = KB.Format.map(f=>
    `<div class="f-card ${S.format===f.id?'active tofu':''}" onclick="setVal('format','${f.id}')">
      <div style="font-size:2rem;margin-bottom:8px;">${f.icon}</div><div class="f-title">${f.id}</div><div class="f-desc">${f.desc}</div>
    </div>`
  ).join('');

  // Structure
  document.getElementById('structure-list').innerHTML = KB.Structure.map(s=>
    `<div class="selectable-item ${S.struct===s.id?'active':''}" onclick="setVal('struct','${s.id}')">
      <div class="s-icon">🏗️</div><div class="s-content"><div class="s-title">${s.name}</div><div class="s-desc">${s.desc}</div></div>
    </div>`
  ).join('');

  // Hooks & CTAs
  renderIdeas(); // Also renders hooks/ctas/core based on funnel

  // Vis Enhancements
  document.getElementById('vfx-list').innerHTML = KB.VisualEnhancements.map((v,i)=>
    `<button class="chip ${S['vfx'+i]?'active':''}" id="vfxbtn${i}" onclick="toggleVfx(${i})">${v}</button>`
  ).join('');

  // Audio Hooks & Conclusion
  document.getElementById('audio-hook-list').innerHTML = KB.Audio.Hook.map(v=>`<button class="chip">${v}</button>`).join('');
  document.getElementById('audio-conc-list').innerHTML = KB.Audio.Conclusion.map(v=>`<button class="chip">${v}</button>`).join('');

  // Location
  const locSel = document.getElementById('loc-select');
  KB.Production.Location.forEach(l=>{
    const o = document.createElement('option'); o.value=l.id; o.textContent=l.id;
    if(S.location===l.id) o.selected=true;
    locSel.appendChild(o);
  });
  updateWardrobe();

  // Cam Checklist
  document.getElementById('cam-chk').innerHTML = KB.Production.Camera.map((c,i)=>
    `<div class="chk-item"><input type="checkbox" id="cam${i}" ${S['cam'+i]?'checked':''} onchange="svS()"> <label for="cam${i}">${c}</label></div>`
  ).join('');

  // Post Prod
  document.getElementById('post-color').innerHTML = KB.PostProduction.Color.map((c,i)=>
    `<div class="chk-item"><input type="checkbox" id="pc${i}" ${S['pc'+i]?'checked':''} onchange="svS()"> <label for="pc${i}">${c}</label></div>`
  ).join('');
  document.getElementById('post-audio').innerHTML = KB.PostProduction.AudioMix.map((c,i)=>
    `<div class="chk-item"><input type="checkbox" id="pa${i}" ${S['pa'+i]?'checked':''} onchange="svS()"> <label for="pa${i}">${c}</label></div>`
  ).join('');
  
  // Restore checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(el => {
    if(S[el.id]) el.checked = true;
  });
  if(S.script) document.getElementById('master-script').value = S.script;

  renderBGM();
}

function setVal(k,v){
  S[k] = v; svS(); initUI(); 
}
function toggleVfx(i){
  S['vfx'+i] = !S['vfx'+i]; svS();
  document.getElementById('vfxbtn'+i).classList.toggle('active');
}

function renderIdeas(){
  // Core Values AI
  const cvg = document.getElementById('cv-grid');
  if(!S.funnel) { cvg.innerHTML='<div class="text-center" style="grid-column:span 3;color:var(--text3)">กรุณาเลือก Funnel Stage ก่อน</div>'; }
  else {
    if(!S.cv || S.cv.f !== S.funnel){
      // Generate new 3 values
      const pool = KB.CoreValues[S.funnel];
      const shuffled = [...pool].sort(()=>0.5-Math.random());
      S.cv = { f:S.funnel, v:[shuffled[0], shuffled[1], shuffled[2]] }; svS();
    }
    cvg.innerHTML = S.cv.v.map((val, idx)=>
      `<div class="f-card active ${S.funnel.toLowerCase()}">
         <div class="btn-refresh" title="สุ่มใหม่" onclick="event.stopPropagation(); refreshCV(${idx})">🔄</div>
         <div class="f-title">Value ${idx+1}</div><div class="f-desc" id="cv-val-${idx}">${val}</div>
       </div>`
    ).join('');
  }

  // Verbal Hook
  let vList = KB.Hooks.Verbal.TOFU;
  if(S.funnel) vList = KB.Hooks.Verbal[S.funnel];
  document.getElementById('vhook-list').innerHTML = vList.map(h=>
    `<div class="selectable-item ${S.vhook===h?'active':''}" onclick="setVal('vhook','${h}')">
      <div class="s-icon">🗣</div><div class="s-content"><div class="s-title">${h.replace(/\[ICP\]/g, S.icp||'คุณ')}</div></div>
    </div>`
  ).join('');

  // Re-Hook
  document.getElementById('rehook-list').innerHTML = KB.Hooks.ReHook.map(h=>
    `<div class="selectable-item ${S.rehook===h?'active':''}" onclick="setVal('rehook','${h}')">
      <div class="s-icon">🎣</div><div class="s-content"><div class="s-title">${h}</div></div>
    </div>`
  ).join('');

  // CTA
  let cList = KB.CTA.TOFU;
  if(S.funnel) cList = KB.CTA[S.funnel];
  document.getElementById('cta-list').innerHTML = cList.map(c=>
    `<div class="selectable-item ${S.cta===c?'active':''}" onclick="setVal('cta','${c}')">
      <div class="s-icon">🎯</div><div class="s-content"><div class="s-title">${c}</div></div>
    </div>`
  ).join('');

  // Vis Hook
  document.getElementById('visual-hook-list').innerHTML = KB.Hooks.Visual.map(v=>
    `<div class="f-card ${S.vishook===v?'active bofu':''}" onclick="setVal('vishook','${v}')">
      <div class="f-title" style="font-size:0.95rem;">${v}</div>
    </div>`
  ).join('');
}

async function refreshCV(idx){
  if(!S.geminiKey) {
    const pool = KB.CoreValues[S.funnel];
    let n = pool[Math.floor(Math.random()*pool.length)];
    while(n === S.cv.v[idx]) { n = pool[Math.floor(Math.random()*pool.length)]; }
    S.cv.v[idx] = n; svS(); renderIdeas();
    toast('💡', 'ใช้ระบบจำลอง (กรอก API Key เพื่อใช้ AI คิดสด)');
    return;
  }
  
  const el = document.getElementById('cv-val-'+idx);
  const oldText = el.innerText;
  el.innerHTML = '<span style="color:var(--accent);">กำลังประมวลผล... 🤖</span>';
  
  try {
    const prompt = `ในฐานะครีเอเตอร์สายการเงิน Nick | Financetry จงคิดหัวข้อย่อย (Core Value / Key Takeaway) 1 หัวข้อ สำหรับสคริปต์วิดีโอ เพื่อเจาะกลุ่มเป้าหมาย [${S.icp}] ในระดับ [${S.funnel}] ความยาว 1-2 ประโยคสั้นๆ ขอเนื้อหาตรงประเด็น และห้ามซ้ำกับหัวข้อเหล่านี้: ${S.cv.v.join(', ')}`;
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=' + S.geminiKey, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ contents: [{parts: [{text: prompt}]}] })
    });
    const data = await res.json();
    if(data.error) throw new Error(data.error.message);
    const aiText = data.candidates[0].content.parts[0].text.trim().replace(/[\"*]/g, '');
    S.cv.v[idx] = aiText; svS(); renderIdeas();
    toast('✨', 'AI คิดให้เรียบร้อย!');
  } catch(e) {
    console.error(e);
    toast('❌', 'API Error: ' + e.message);
    el.innerText = oldText;
  }
}

function updateWardrobe(){
  const v = document.getElementById('loc-select').value;
  S.location = v; svS();
  const desc = document.getElementById('loc-desc');
  const rec = document.getElementById('wardrobe-rec');
  if(!v) { desc.textContent=''; rec.textContent='เลือกสถานที่ก่อนเพื่อดูคำแนะนำสีเสื้อ'; return; }
  
  const loc = KB.Production.Location.find(x=>x.id===v);
  desc.textContent = loc.desc;
  
  if(v==='Indoor'){
    rec.innerHTML = `<strong>Dark (สีกรมท่า/สีดำ):</strong> ${KB.Production.WardrobeLogic.Dark}<br><br>
                     <strong>Pattern:</strong> ${KB.Production.WardrobeLogic.Pattern}`;
  } else {
    rec.innerHTML = `<strong>White (เสื้อสีสว่าง):</strong> แนะนำสำหรับ Outdoor เพื่อไม่ให้ดูดแสง/ความร้อนจนเกินไป<br><br>
                     <strong>Pattern:</strong> ${KB.Production.WardrobeLogic.Pattern}`;
  }
}

function generateScriptText(){
  const lines=[];
  lines.push('=== 🎬 MASTER SCRIPT ===\n');
  if(S.icp) lines.push(`[Target]: ${S.icp}`);
  if(S.funnel) lines.push(`[Funnel]: ${S.funnel}`);
  
  lines.push('\n🪝 HOOK (0-3s)');
  if(S.vishook) lines.push(`Visual: ${S.vishook}`);
  lines.push(`Audio: ${S.vhook || '[เลือก Verbal Hook]'}`);
  
  lines.push('\n📖 BODY & CORE VALUES');
  if(S.cv) S.cv.v.forEach((v,i)=> lines.push(`${i+1}. ${v}\n...`));
  else lines.push('...');
  
  lines.push('\n🎣 RE-HOOK (ตบดึงสติคนดู)');
  lines.push(`${S.rehook || '[เลือก Re-Hook]'}\n...`);
  
  lines.push('\n🎯 CALL TO ACTION');
  lines.push(S.cta || '[เลือก CTA]');
  
  document.getElementById('master-script').value = lines.join('\n');
  svS(); toast('✨','Script Generated');
}

function genShotList(){
  const s = document.getElementById('shot-list-body');
  let h = '';
  h += `<tr><td>1</td><td>Visual Hook: ${S.vishook||'Opening'}</td><td>Medium</td><td>Eye-Level</td><td>ก้าวเดินเข้าเฟรม / หรือใช้ขยับแขน</td></tr>`;
  if(S.cv){
    S.cv.v.forEach((v,i)=>{
      h += `<tr><td>${i+2}</td><td>Core Value: ${v.substring(0,15)}...</td><td>Close-up</td><td>${i%2===0?'Low-Angle':'Eye-Level'}</td><td>Cutting on Motion สลับมุม</td></tr>`;
    });
  }
  h += `<tr><td>X</td><td>Re-Hook: ${S.rehook||'ดึงสติ'}</td><td>Wide</td><td>Eye-Level</td><td>Flash Impact / Sound Glitch</td></tr>`;
  h += `<tr><td>Y</td><td>Call to Action: ${S.cta||'จบ'}</td><td>Medium</td><td>Eye-Level</td><td>ชี้ไปที่ลิงก์ หรือมองกล้องนิ่งๆ</td></tr>`;
  s.innerHTML = h;
  toast('⚡','Shot List Updated');
}

// BGM
let audioEl = document.getElementById('audio-el');
function renderBGM(){
  if(typeof window.ADB === 'undefined' || !window.ADB.bgm) return;
  const c = document.getElementById('bgm-moods');
  const moods = Object.keys(window.ADB.bgm);
  c.innerHTML = moods.map(m=>`<button class="chip ${S.bgmMood===m?'active':''}" onclick="setBGMMood('${m}')">${m.replace(/^\d+-/,'').replace(/_/g,' ')}</button>`).join('');
  if(!S.bgmMood && moods.length) setBGMMood(moods[0]);
  else if(S.bgmMood) setBGMMood(S.bgmMood);
}
function setBGMMood(m){
  S.bgmMood = m; svS();
  document.querySelectorAll('#bgm-moods .chip').forEach(c=>{
    c.classList.remove('active');
    if(c.textContent.replace(/ /g,'_') === m.replace(/^\d+-/,'')) c.classList.add('active'); // approximation
  });
  const t = window.ADB.bgm[m] || [];
  document.getElementById('bgm-tracks').innerHTML = t.map(tk=>
    `<div class="selectable-item ${S.curTrack===tk?'active':''}" onclick="playT('${tk}','../3-Post-Production/Audio/Background/${m}/${tk}')">
      <div class="s-icon">🎵</div><div class="s-content"><div class="s-title">${tk.replace(/\.(m4a|mp3)/,'')}</div></div>
    </div>`
  ).join('');
}
function playT(name, path){
  S.curTrack = name; S.curPath = path; svS();
  audioEl.src = path; audioEl.play().catch(e=>console.log(e));
  document.getElementById('player-bar').classList.add('show');
  document.getElementById('play-btn').innerHTML = '⏸';
  document.getElementById('track-name').textContent = name;
  setBGMMood(S.bgmMood); // refresh active
}
audioEl.addEventListener('timeupdate', ()=>{
  const p = (audioEl.currentTime / audioEl.duration) * 100 || 0;
  document.getElementById('progress-fill-audio').style.width = p + '%';
  document.getElementById('time-cur').textContent = fmtTime(audioEl.currentTime);
  document.getElementById('time-tot').textContent = fmtTime(audioEl.duration||0);
});
audioEl.addEventListener('ended', ()=>document.getElementById('play-btn').innerHTML='▶');
function togglePlay(){ if(audioEl.paused) { audioEl.play(); document.getElementById('play-btn').innerHTML='⏸'; } else { audioEl.pause(); document.getElementById('play-btn').innerHTML='▶'; } }
function seekAudio(e){ const r=document.getElementById('progress-bg').getBoundingClientRect(); audioEl.currentTime = ((e.clientX-r.left)/r.width)*audioEl.duration; }
function fmtTime(s){ if(isNaN(s)) return '0:00'; return `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`; }

// Teleprompter
let tpInt, tpSpeed=3;
function openTP(){
  document.getElementById('tp-text').textContent = document.getElementById('master-script').value || 'No script...';
  document.getElementById('tp-overlay').classList.add('active');
  document.getElementById('tp-text').style.transform = 'translateY(0)';
}
function closeTP(){ clearInterval(tpInt); tpInt=null; document.getElementById('tp-overlay').classList.remove('active'); document.getElementById('tp-play-btn').innerHTML = '▶ Play'; }
function toggleTpPlay(){
  const b = document.getElementById('tp-play-btn');
  if(tpInt){ clearInterval(tpInt); tpInt=null; b.innerHTML='▶ Play'; }
  else {
    b.innerHTML='⏸ Pause'; let y=0; const c=document.getElementById('tp-text');
    if(c.style.transform.includes('translateY')) y = parseFloat(c.style.transform.replace(/[^\d.-]/g, ''))||0;
    tpInt = setInterval(()=>{ y-=(tpSpeed*0.5); c.style.transform=`translateY(${y}px)`; },50);
  }
}
function adjTpSpeed(d){ tpSpeed = Math.max(1, Math.min(10, tpSpeed+d)); document.getElementById('tp-speed-val').textContent = tpSpeed; }

function clearData(){ if(confirm('Clear all data?')) { localStorage.removeItem('cs_db'); location.reload(); } }
function toast(i,m){ const t=document.createElement('div'); t.className='toast'; t.innerHTML=`<span>${i}</span><span style="font-weight:500">${m}</span>`; document.getElementById('toast-container').appendChild(t); setTimeout(()=>{t.classList.add('out'); setTimeout(()=>t.remove(),300)}, 2500); }

window.addEventListener('DOMContentLoaded', initUI);
</script>
</body></html>
""")

with open(path, "w", encoding="utf-8") as f:
    f.write("\n".join(html))

print("Created index.html")
