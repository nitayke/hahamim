import "https://cdn.jsdelivr.net/npm/chart.js";

export default function Records() {
  return (
    <div>
      <div className="game-page-container">
        <h2>רשימת השיאים</h2>
        <div id="records"></div>
      </div>
      <div className="game-page-container">
        <h2>סטטיסטיקות</h2>
        <h3>(הניקוד מעוגל לעשרות)</h3>
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  );
}
