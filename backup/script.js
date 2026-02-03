

// 搜尋功能
document.getElementById('searchInput').addEventListener('keyup', function () {
  const filter = this.value.toUpperCase();
  const rows = document.querySelectorAll("#boothTable tbody tr");
  rows.forEach(row => {
    const text = row.textContent.toUpperCase();
    row.style.display = text.indexOf(filter) > -1 ? "" : "none";
  });
});
