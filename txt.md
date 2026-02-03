以下我在下codepen寫的程式碼:




<div class="app-wrap">
    <div class="app-header">
        <h1>114學年度親職教育日</h1>
        <div class="school-tag">青溪國小園遊會服務平台</div>
    </div>

    <div class="nav-grid">
        <a href="https://docs.google.com/forms/d/1ofmWoXQsNtqirKLW-tRrmjBQn8X9Occae6-AWoHlFSQ/viewform" target="_blank" class="nav-card red-border">
            <span class="nav-icon">🚨</span>
            <span class="nav-label">環境報修</span>
        </a>
        <div class="nav-card green-border" id="toggleMap">
            <span class="nav-icon">🗺️</span>
            <span class="nav-label">學校地圖</span>
        </div>
    </div>

    <div class="map-overlay" id="mapSection">
        <div class="map-card">
            <img src="/picture.jpg" alt="校園地圖" id="mainMapImg">
            <p>💡 點擊地圖可查看高清原圖</p>
        </div>
    </div>

    <div class="content-card">
        <div class="card-title">📅 活動時程 (115/3/28)</div>
        <ul class="timeline">
            <li><span class="t-time">08:00</span> <span class="t-info">社團表演與開幕</span></li>
            <li><span class="t-time">09:00</span> <span class="t-info">園遊會攤位開始</span></li>
            <li><span class="t-time">11:20</span> <span class="t-info">整理環境與放學</span></li>
        </ul>
        <div class="vacation-tag">📌 115/4/2 (四) 為本次活動補假</div>
    </div>

    <div class="content-card">
        <div class="card-title">🔍 攤位快速查詢</div>
        <input type="text" id="searchInput" class="search-bar" placeholder="輸入班級(如502)或關鍵字(如餅乾)...">
        
        <div class="table-scroll">
            <table id="boothTable">
                <thead>
                    <tr><th>班級</th><th>攤位名稱</th><th>類型</th><th>位置</th></tr>
                </thead>
                <tbody>
                    <tr><td>101</td><td>一起來逛街</td><td><span class="tag tag-goods">物品</span></td><td>和平樓 1F</td></tr>
                    <tr><td>102</td><td>102 號寶庫</td><td><span class="tag tag-goods">物品</span></td><td>和平樓 1F</td></tr>
                    <tr><td>108</td><td>108 快樂小舖</td><td><span class="tag tag-goods">物品</span></td><td>和平樓 1F</td></tr>
                    <tr><td>201</td><td>幸福柑仔店</td><td><span class="tag tag-goods">物品</span></td><td>和平樓 2F</td></tr>
                    <tr><td>205</td><td>二五歡樂市集</td><td><span class="tag tag-goods">物品</span></td><td>和平樓 2F</td></tr>
                    <tr><td>206</td><td>206 尋寶店</td><td><span class="tag tag-goods">物品</span></td><td>和平樓 2F</td></tr>
                    <tr><td>407</td><td>不平凡的407</td><td><span class="tag tag-goods">物品</span></td><td>和平樓 4F</td></tr>
                    <tr><td>408</td><td>408 無限城</td><td><span class="tag tag-food">食物</span></td><td>和平樓 4F</td></tr>
                    <tr><td>409</td><td>歡樂選購 409</td><td><span class="tag tag-goods">物品</span></td><td>和平樓 4F</td></tr>
                    <tr><td>502</td><td>吐司市集</td><td><span class="tag tag-game">遊戲</span></td><td>和平樓 5F</td></tr>
                    <tr><td>506</td><td>讚不絕口666</td><td><span class="tag tag-food">食物</span></td><td>和平樓 5F</td></tr>
                    <tr class="special"><td>特教</td><td>奇雞街坊</td><td><span class="tag tag-goods">物品</span></td><td>信義樓 1F</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>










:root {
  --green: #2e7d32;
  --red: #d32f2f;
  --bg: #f5f7fa;
}

body {
  font-family: "PingFang TC", "Microsoft JhengHei", sans-serif;
  background-color: var(--bg);
  margin: 0; padding: 15px 10px; color: #333;
}

.app-wrap { max-width: 450px; margin: 0 auto; }

/* 標題美化 */
.app-header {
  background: linear-gradient(135deg, #2e7d32, #1b5e20);
  color: white; padding: 25px; border-radius: 20px;
  text-align: center; margin-bottom: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}
.app-header h1 { margin: 0; font-size: 1.4rem; }
.school-tag { font-size: 0.85rem; opacity: 0.8; margin-top: 5px; }

/* 按鈕卡片 */
.nav-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
.nav-card {
  background: white; padding: 18px; border-radius: 15px;
  text-align: center; text-decoration: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05); cursor: pointer;
  transition: transform 0.2s;
}
.nav-card:active { transform: scale(0.95); }
.red-border { border-bottom: 4px solid var(--red); }
.green-border { border-bottom: 4px solid var(--green); }
.nav-icon { font-size: 1.6rem; display: block; }
.nav-label { font-weight: bold; color: #444; font-size: 0.9rem; margin-top: 5px; display: block; }

/* 地圖顯示效果 */
.map-overlay { display: none; margin-bottom: 20px; animation: slideDown 0.3s ease-out; }
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.map-card { background: white; padding: 10px; border-radius: 15px; text-align: center; border: 1px solid #ddd; }
.map-card img { width: 100%; border-radius: 10px; cursor: pointer; }
.map-card p { font-size: 12px; color: #888; margin: 8px 0 0; }

/* 內容卡片 */
.content-card { background: white; border-radius: 20px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
.card-title { font-weight: bold; color: var(--green); margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }

/* 時間軸 */
.timeline { list-style: none; padding: 0; margin: 0; }
.timeline li { margin-bottom: 10px; display: flex; align-items: center; }
.t-time { background: #e8f5e9; color: var(--green); padding: 2px 8px; border-radius: 5px; font-weight: bold; margin-right: 15px; font-size: 0.85rem; }
.t-info { font-size: 0.95rem; color: #555; }
.vacation-tag { background: #fff9c4; padding: 8px; border-radius: 8px; font-size: 0.8rem; margin-top: 15px; text-align: center; }

/* 搜尋與表格 */
.search-bar { width: 100%; padding: 12px; border: 2px solid var(--green); border-radius: 10px; box-sizing: border-box; font-size: 16px; margin-bottom: 15px; outline: none; background: #f9f9f9; }
.table-scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 10px; background: #f1f8e9; color: var(--green); font-size: 0.8rem; }
td { padding: 12px 10px; border-bottom: 1px solid #eee; font-size: 0.9rem; }
.special { background: #fffde7; font-weight: bold; }

/* 標籤顏色 */
.tag { padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; color: white; font-weight: bold; }
.tag-food { background: #ff8a65; }
.tag-goods { background: #4fc3f7; }
.tag-game { background: #9575cd; }







// 切換地圖顯示
document.getElementById('toggleMap').addEventListener('click', function() {
  const section = document.getElementById('mapSection');
  section.style.display = (section.style.display === 'block') ? 'none' : 'block';
});

// 點擊地圖開原圖
document.getElementById('mainMapImg').addEventListener('click', function() {
  window.open('https://lurl.cc/1ym5U', '_blank');
});

// 搜尋功能
document.getElementById('searchInput').addEventListener('keyup', function() {
  const filter = this.value.toUpperCase();
  const rows = document.querySelectorAll("#boothTable tbody tr");
  rows.forEach(row => {
    const text = row.textContent.toUpperCase();
    row.style.display = text.indexOf(filter) > -1 ? "" : "none";
  });
});
















