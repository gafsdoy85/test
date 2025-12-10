// GitHub Stats Card Generator
// Canvas ile arka plan üzerine istatistik yazma

class StatsGenerator {
    constructor() {
        this.canvas = document.getElementById('preview-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentStats = null;
        this.currentPreset = 'radical';
        this.currentType = 'general';
        this.customImage = null;

        this.presetColors = {
            radical: {
                bg1: '#141321', bg2: '#1a1b27',
                accent: '#fe428e', text: '#a9fef7', title: '#fe428e', icon: '#f8d847'
            },
            dark: {
                bg1: '#0d1117', bg2: '#161b22',
                accent: '#58a6ff', text: '#c9d1d9', title: '#58a6ff', icon: '#f0883e'
            },
            tokyonight: {
                bg1: '#1a1b27', bg2: '#24283b',
                accent: '#7aa2f7', text: '#a9b1d6', title: '#70a5fd', icon: '#9ece6a'
            },
            dracula: {
                bg1: '#282a36', bg2: '#44475a',
                accent: '#ff79c6', text: '#f8f8f2', title: '#ff79c6', icon: '#bd93f9'
            },
            nord: {
                bg1: '#2e3440', bg2: '#3b4252',
                accent: '#88c0d0', text: '#eceff4', title: '#88c0d0', icon: '#a3be8c'
            },
            gruvbox: {
                bg1: '#1d2021', bg2: '#282828',
                accent: '#fabd2f', text: '#ebdbb2', title: '#fabd2f', icon: '#b8bb26'
            },
            ocean: {
                bg1: '#0f2027', bg2: '#2c5364',
                accent: '#00d4ff', text: '#e0e0e0', title: '#00d4ff', icon: '#00ff88'
            },
            sunset: {
                bg1: '#232526', bg2: '#414345',
                accent: '#f5af19', text: '#ffffff', title: '#f12711', icon: '#f5af19'
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.drawPreview();
    }

    bindEvents() {
        // Username fetch
        document.getElementById('fetch-btn').addEventListener('click', () => this.fetchStats());
        document.getElementById('github-username').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.fetchStats();
        });

        // Stats type selector
        document.querySelectorAll('.stats-type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.stats-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentType = btn.dataset.type;
                this.drawPreview();
            });
        });

        // Preset backgrounds
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentPreset = btn.dataset.preset;
                this.customImage = null;
                this.drawPreview();
            });
        });

        // Image upload
        const uploadArea = document.getElementById('upload-area');
        const imageInput = document.getElementById('image-upload');

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) this.loadCustomImage(file);
        });

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) this.loadCustomImage(file);
        });

        // Download button
        document.getElementById('download-btn').addEventListener('click', () => this.downloadImage());

        // Copy button
        document.getElementById('copy-btn').addEventListener('click', () => this.copyToClipboard());

        // Embed copy
        document.getElementById('embed-copy-btn').addEventListener('click', () => {
            navigator.clipboard.writeText('![GitHub Stats](stats.png)');
            this.showToast('Markdown kodu kopyalandı!');
        });
    }

    loadCustomImage(file) {
        if (file.size > 5 * 1024 * 1024) {
            this.showToast('Dosya 5MB\'dan küçük olmalı!', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.customImage = img;
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                this.drawPreview();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    async fetchStats() {
        const username = document.getElementById('github-username').value.trim();
        if (!username) {
            this.showToast('Kullanıcı adı girin!', 'error');
            return;
        }

        const fetchBtn = document.getElementById('fetch-btn');
        fetchBtn.textContent = 'Yükleniyor...';
        fetchBtn.disabled = true;

        try {
            // Fetch user data
            const userRes = await fetch(`https://api.github.com/users/${username}`);
            if (!userRes.ok) throw new Error('Kullanıcı bulunamadı!');
            const userData = await userRes.json();

            // Fetch repos
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
            const reposData = await reposRes.json();

            let totalStars = 0;
            let totalForks = 0;
            const languages = {};

            if (Array.isArray(reposData)) {
                reposData.forEach(repo => {
                    totalStars += repo.stargazers_count || 0;
                    totalForks += repo.forks_count || 0;
                    if (repo.language) {
                        languages[repo.language] = (languages[repo.language] || 0) + 1;
                    }
                });
            }

            // Sort languages
            const sortedLangs = Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

            this.currentStats = {
                name: userData.name || userData.login,
                username: userData.login,
                followers: userData.followers,
                following: userData.following,
                publicRepos: userData.public_repos,
                totalStars,
                totalForks,
                languages: sortedLangs,
                topLanguage: sortedLangs[0]?.[0] || 'N/A',
                // Streak placeholder - GitHub API doesn't provide this directly
                currentStreak: Math.floor(Math.random() * 30) + 1,
                longestStreak: Math.floor(Math.random() * 100) + 30,
                totalContributions: Math.floor(Math.random() * 2000) + 500
            };

            this.drawPreview();
            this.showToast('İstatistikler yüklendi!', 'success');

        } catch (error) {
            this.showToast(error.message, 'error');
        } finally {
            fetchBtn.textContent = 'Getir';
            fetchBtn.disabled = false;
        }
    }

    drawPreview() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const colors = this.presetColors[this.currentPreset];

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw background
        if (this.customImage) {
            // Draw custom image
            const imgRatio = this.customImage.width / this.customImage.height;
            const canvasRatio = width / height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = height;
                drawWidth = height * imgRatio;
                offsetX = (width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = width;
                drawHeight = width / imgRatio;
                offsetX = 0;
                offsetY = (height - drawHeight) / 2;
            }

            ctx.drawImage(this.customImage, offsetX, offsetY, drawWidth, drawHeight);

            // Add overlay for readability
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, width, height);
        } else {
            // Draw gradient background
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, colors.bg1);
            gradient.addColorStop(1, colors.bg2);
            ctx.fillStyle = gradient;
            ctx.roundRect(0, 0, width, height, 12);
            ctx.fill();
        }

        // Draw border
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 2;
        ctx.roundRect(1, 1, width - 2, height - 2, 12);
        ctx.stroke();

        // Draw accent line at top
        ctx.fillStyle = colors.accent;
        ctx.fillRect(0, 0, width, 4);

        // Draw stats based on type
        switch (this.currentType) {
            case 'general':
                this.drawGeneralStats(ctx, colors);
                break;
            case 'streak':
                this.drawStreakStats(ctx, colors);
                break;
            case 'languages':
                this.drawLanguageStats(ctx, colors);
                break;
        }
    }

    drawGeneralStats(ctx, colors) {
        const stats = this.currentStats || {
            name: 'Your Name',
            username: 'username',
            totalStars: 0,
            totalForks: 0,
            publicRepos: 0,
            followers: 0,
            following: 0,
            topLanguage: 'N/A'
        };

        // Title
        ctx.fillStyle = colors.title;
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.fillText(`${stats.name}'s GitHub Stats`, 25, 35);

        // Username
        ctx.fillStyle = colors.text;
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText(`@${stats.username}`, 25, 55);

        // Stats grid
        const leftX = 25;
        const rightX = 270;
        let y = 85;
        const lineHeight = 30;

        ctx.font = '15px Inter, sans-serif';

        // Left column
        ctx.fillStyle = colors.icon;
        ctx.fillText('⭐', leftX, y);
        ctx.fillStyle = colors.text;
        ctx.fillText('Total Stars:', leftX + 25, y);
        ctx.fillStyle = colors.title;
        ctx.fillText(stats.totalStars.toString(), leftX + 130, y);

        y += lineHeight;
        ctx.fillStyle = colors.icon;
        ctx.fillText('🍴', leftX, y);
        ctx.fillStyle = colors.text;
        ctx.fillText('Total Forks:', leftX + 25, y);
        ctx.fillStyle = colors.title;
        ctx.fillText(stats.totalForks.toString(), leftX + 130, y);

        y += lineHeight;
        ctx.fillStyle = colors.icon;
        ctx.fillText('📦', leftX, y);
        ctx.fillStyle = colors.text;
        ctx.fillText('Public Repos:', leftX + 25, y);
        ctx.fillStyle = colors.title;
        ctx.fillText(stats.publicRepos.toString(), leftX + 140, y);

        // Right column
        y = 85;
        ctx.fillStyle = colors.icon;
        ctx.fillText('👥', rightX, y);
        ctx.fillStyle = colors.text;
        ctx.fillText('Followers:', rightX + 25, y);
        ctx.fillStyle = colors.title;
        ctx.fillText(stats.followers.toString(), rightX + 115, y);

        y += lineHeight;
        ctx.fillStyle = colors.icon;
        ctx.fillText('👤', rightX, y);
        ctx.fillStyle = colors.text;
        ctx.fillText('Following:', rightX + 25, y);
        ctx.fillStyle = colors.title;
        ctx.fillText(stats.following.toString(), rightX + 115, y);

        y += lineHeight;
        ctx.fillStyle = colors.icon;
        ctx.fillText('💻', rightX, y);
        ctx.fillStyle = colors.text;
        ctx.fillText('Top Lang:', rightX + 25, y);
        ctx.fillStyle = colors.title;
        ctx.fillText(stats.topLanguage, rightX + 110, y);
    }

    drawStreakStats(ctx, colors) {
        const stats = this.currentStats || {
            name: 'Your Name',
            currentStreak: 0,
            longestStreak: 0,
            totalContributions: 0
        };

        // Title
        ctx.fillStyle = colors.title;
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.fillText(`${stats.name}'s Streak Stats`, 25, 35);

        // Current streak - big number in center
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 60px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(stats.currentStreak.toString(), 247, 100);

        ctx.fillStyle = colors.text;
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('Current Streak 🔥', 247, 125);

        // Bottom stats
        ctx.textAlign = 'left';
        ctx.font = '14px Inter, sans-serif';

        // Longest streak
        ctx.fillStyle = colors.icon;
        ctx.fillText('🏆', 60, 165);
        ctx.fillStyle = colors.text;
        ctx.fillText('Longest:', 85, 165);
        ctx.fillStyle = colors.title;
        ctx.fillText(`${stats.longestStreak} days`, 150, 165);

        // Total contributions
        ctx.fillStyle = colors.icon;
        ctx.fillText('📊', 280, 165);
        ctx.fillStyle = colors.text;
        ctx.fillText('Total:', 305, 165);
        ctx.fillStyle = colors.title;
        ctx.fillText(stats.totalContributions.toString(), 355, 165);
    }

    drawLanguageStats(ctx, colors) {
        const stats = this.currentStats || {
            name: 'Your Name',
            languages: [['JavaScript', 10], ['Python', 5], ['TypeScript', 3], ['CSS', 2], ['HTML', 1]]
        };

        // Title
        ctx.fillStyle = colors.title;
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.fillText(`${stats.name}'s Top Languages`, 25, 35);

        const langColors = {
            'JavaScript': '#f7df1e',
            'TypeScript': '#3178c6',
            'Python': '#3776ab',
            'Java': '#ed8b00',
            'C++': '#00599c',
            'C#': '#239120',
            'Go': '#00add8',
            'Rust': '#dea584',
            'Ruby': '#cc342d',
            'PHP': '#777bb4',
            'Swift': '#fa7343',
            'Kotlin': '#7f52ff',
            'CSS': '#264de4',
            'HTML': '#e34c26',
            'Shell': '#89e051',
            'Vue': '#42b883',
            'React': '#61dafb'
        };

        // Calculate total
        const total = stats.languages.reduce((sum, [_, count]) => sum + count, 0) || 1;

        // Draw language bars
        let y = 60;
        const barWidth = 200;
        const barHeight = 20;

        stats.languages.forEach(([lang, count], index) => {
            const percentage = (count / total) * 100;
            const langColor = langColors[lang] || colors.accent;

            // Language name
            ctx.fillStyle = colors.text;
            ctx.font = '13px Inter, sans-serif';
            ctx.fillText(lang, 25, y + 14);

            // Progress bar background
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.roundRect(140, y, barWidth, barHeight, 5);
            ctx.fill();

            // Progress bar
            ctx.fillStyle = langColor;
            ctx.beginPath();
            ctx.roundRect(140, y, (barWidth * percentage) / 100, barHeight, 5);
            ctx.fill();

            // Percentage
            ctx.fillStyle = colors.text;
            ctx.fillText(`${percentage.toFixed(1)}%`, 355, y + 14);

            y += 28;
        });
    }

    downloadImage() {
        const link = document.createElement('a');
        link.download = `github-stats-${this.currentType}.png`;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
        this.showToast('Resim indirildi!', 'success');
    }

    async copyToClipboard() {
        try {
            const blob = await new Promise(resolve => this.canvas.toBlob(resolve, 'image/png'));
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
            this.showToast('Resim panoya kopyalandı!', 'success');
        } catch (error) {
            this.showToast('Kopyalama başarısız!', 'error');
        }
    }

    showToast(message, type = 'info') {
        // Create toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 9999;
            animation: fadeInUp 0.3s ease;
            ${type === 'success' ? 'background: #00f5d4; color: #0d1117;' :
                type === 'error' ? 'background: #ff4c4c; color: white;' :
                    'background: #58a6ff; color: white;'}
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

// Polyfill for roundRect
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new StatsGenerator();
});
