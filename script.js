document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tableRows = document.querySelectorAll("#boothTable tbody tr");
    const backToTopBtn = document.getElementById('backToTop');
    
    // --- 倒數計時器邏輯 ---
    const targetDate = new Date("2026-03-28T09:00:00").getTime(); // 115/3/28
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "🎉 活動進行中！";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
    }
    
    // 立即執行一次並每小時更新
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60);

    // --- 回到頂部按鈕邏輯 ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 攤位列表邏輯 (初始化與篩選) ---
    // 1. 初始化：給每一行加上 data-category 屬性
    tableRows.forEach(row => {
        // 假設「類型」在第三個欄位 (index 2)
        const typeCell = row.cells[2]; 
        const typeText = typeCell.textContent.trim();
        let category = 'other';
        
        if (typeText.includes('食物')) category = 'food';
        else if (typeText.includes('物品')) category = 'goods';
        else if (typeText.includes('遊戲')) category = 'game';
        
        row.setAttribute('data-category', category);
    });

    // 2. 篩選按鈕點擊事件
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterTable();
        });
    });

    // 3. 搜尋框輸入事件
    searchInput.addEventListener('keyup', filterTable);

    // 核心篩選邏輯
    function filterTable() {
        const searchText = searchInput.value.toUpperCase();
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        tableRows.forEach(row => {
            const rowText = row.textContent.toUpperCase();
            const rowCategory = row.getAttribute('data-category');
            
            const matchesSearch = rowText.indexOf(searchText) > -1;
            const matchesCategory = (activeCategory === 'all') || (rowCategory === activeCategory);

            if (matchesSearch && matchesCategory) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }
});