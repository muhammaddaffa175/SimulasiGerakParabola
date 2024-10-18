document.getElementById("parameter-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const velocity = parseFloat(document.getElementById("velocity").value);
    const angle = parseFloat(document.getElementById("angle").value);
    
    if (isNaN(velocity) || isNaN(angle)) {
        alert("Masukkan nilai yang valid untuk kecepatan dan sudut.");
        return;
    }

    simulateProjectile(velocity, angle);
});

const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

function simulateProjectile(v0, angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas sebelum memulai
    
    const g = 9.8; // Gravitasi
    const radianAngle = angle * (Math.PI / 180); // Konversi sudut ke radian
    const v0x = v0 * Math.cos(radianAngle); // Komponen kecepatan di x
    const v0y = v0 * Math.sin(radianAngle); // Komponen kecepatan di y

    let t = 0; // Waktu
    const interval = 0.05; // Interval waktu untuk simulasi

    function draw() {
        t += interval;

        // Hitung posisi x dan y berdasarkan waktu
        const x = v0x * t;
        const y = v0y * t - 0.5 * g * t * t;

        // Koordinat canvas
        const canvasX = x * 10; // Skala agar terlihat lebih jelas di canvas
        const canvasY = canvas.height - y * 10; // Inversi karena (0, 0) di canvas ada di kiri atas

        // Bersihkan dan gambar titik lintasan
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (canvasY <= canvas.height && canvasX <= canvas.width) {
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
            ctx.fillStyle = "blue";
            ctx.fill();
        }

        if (y >= 0) {
            requestAnimationFrame(draw); // Ulangi animasi
        }
    }

    draw();
}
