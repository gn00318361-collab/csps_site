document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tableRows = document.querySelectorAll("#boothTable tbody tr");

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
            // 移除所有 active
            filterBtns.forEach(b => b.classList.remove('active'));
            // 加上當前 active
            btn.classList.add('active');
            
            // 執行篩選
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
            
            // 檢查關鍵字
            const matchesSearch = rowText.indexOf(searchText) > -1;
            
            // 檢查分類 (如果是 'all' 則通過，否則必須對應 category)
            const matchesCategory = (activeCategory === 'all') || (rowCategory === activeCategory);

            // 兩者都符合才顯示
            if (matchesSearch && matchesCategory) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }
});