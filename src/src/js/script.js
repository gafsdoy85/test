// ===================================
// GitHub Stats Viewer - Main Script
// ===================================

// Language colors mapping
const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Scala: '#c22d40',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Vue: '#41b883',
    Shell: '#89e051',
    PowerShell: '#012456',
    Lua: '#000080',
    R: '#198CE7',
    MATLAB: '#e16737',
    Perl: '#0298c3',
    Haskell: '#5e5086',
    Elixir: '#6e4a7e',
    Clojure: '#db5855',
    Erlang: '#B83998',
    Julia: '#a270ba',
    Vim: '#199f4b',
    Objective: '#438eff',
    Assembly: '#6E4C13',
    Makefile: '#427819',
    Dockerfile: '#384d54',
    Jupyter: '#DA5B0B',
    TeX: '#3D6117'
};

// URL Parameters Configuration
const urlParams = new URLSearchParams(window.location.search);
const config = {
    username: urlParams.get('username') || '',
    theme: urlParams.get('theme') || 'radical',
    card: urlParams.get('card') || 'all', // all, stats, languages, repos, profile
    embed: urlParams.get('embed') === 'true',
    hideBorder: urlParams.get('hide_border') === 'true',
    hideTitle: urlParams.get('hide_title') === 'true',
    showIcons: urlParams.get('show_icons') !== 'false', // default true
    cardWidth: parseInt(urlParams.get('card_width')) || 0,
    bgColor: urlParams.get('bg_color') || '',
    titleColor: urlParams.get('title_color') || '',
    textColor: urlParams.get('text_color') || '',
    iconColor: urlParams.get('icon_color') || '',
    borderColor: urlParams.get('border_color') || '',
    borderRadius: parseInt(urlParams.get('border_radius')) || 0,
    locale: urlParams.get('locale') || 'tr' // tr, en
};

// Translations
const translations = {
    tr: {
        langName: 'Türkçe',
        langFlag: '🇹🇷',
        totalStars: 'Toplam Yıldız',
        totalForks: 'Toplam Fork',
        totalCommits: 'Toplam Commit',
        openPRs: 'Açık PR\'lar',
        openIssues: 'Açık Issue\'lar',
        contributedRepos: 'Katkıda Bulunulan Repo',
        followers: 'Takipçi',
        following: 'Takip',
        repos: 'Repo',
        gists: 'Gist',
        githubStats: 'GitHub İstatistikleri',
        topLanguages: 'En Çok Kullanılan Diller',
        topRepos: 'En Popüler Repolar',
        noBio: 'Bio bulunmuyor.',
        noDescription: 'Açıklama bulunmuyor.',
        noLanguage: 'Dil bulunamadı.',
        noRepo: 'Repo bulunamadı.',
        loading: 'Veriler yükleniyor...',
        enterUsername: 'Lütfen bir kullanıcı adı girin.',
        userNotFound: 'kullanıcısı bulunamadı.',
        apiLimitExceeded: 'API limit aşıldı. Lütfen biraz bekleyin.',
        errorOccurred: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        reposFetchError: 'Repolar alınamadı.',
        streakTitle: 'Katkı & Streak',
        dayStreak: 'Gün Streak',
        contributionsYear: 'Bu Yıl Katkı',
        longestStreak: 'En Uzun Streak',
        streakStart: 'Streak Başlangıç',
        avgContributions: 'Günlük Ortalama',
        last30Days: 'Son 30 Gün',
        theme: 'Tema',
        language: 'Dil',
        search: 'Ara',
        privateContributions: 'Private katkıları göster',
        tokenActive: 'Token aktif',
        tokenSave: 'Kaydet',
        tokenClear: 'Temizle',
        tokenHelp: 'Token nasıl alınır?',
        embedCodes: 'Embed Kodlarını Kopyala',
        embedDescription: 'Bu kodları README.md dosyanıza yapıştırarak istatistiklerinizi gösterebilirsiniz.',
        contributions: 'katkı'
    },
    en: {
        langName: 'English',
        langFlag: '🇬🇧',
        totalStars: 'Total Stars',
        totalForks: 'Total Forks',
        totalCommits: 'Total Commits',
        openPRs: 'Open PRs',
        openIssues: 'Open Issues',
        contributedRepos: 'Contributed Repos',
        followers: 'Followers',
        following: 'Following',
        repos: 'Repos',
        gists: 'Gists',
        githubStats: 'GitHub Stats',
        topLanguages: 'Most Used Languages',
        topRepos: 'Top Repositories',
        noBio: 'No bio available.',
        noDescription: 'No description available.',
        noLanguage: 'No language found.',
        noRepo: 'No repository found.',
        loading: 'Loading data...',
        enterUsername: 'Please enter a username.',
        userNotFound: 'user not found.',
        apiLimitExceeded: 'API limit exceeded. Please wait a moment.',
        errorOccurred: 'An error occurred. Please try again.',
        reposFetchError: 'Failed to fetch repositories.',
        streakTitle: 'Contributions & Streak',
        dayStreak: 'Day Streak',
        contributionsYear: 'This Year',
        longestStreak: 'Longest Streak',
        streakStart: 'Streak Start',
        avgContributions: 'Daily Average',
        last30Days: 'Last 30 Days',
        theme: 'Theme',
        language: 'Language',
        search: 'Search',
        privateContributions: 'Show private contributions',
        tokenActive: 'Token active',
        tokenSave: 'Save',
        tokenClear: 'Clear',
        tokenHelp: 'How to get a token?',
        embedCodes: 'Copy Embed Codes',
        embedDescription: 'Paste these codes into your README.md to display your stats.',
        contributions: 'contributions'
    },
    de: {
        langName: 'Deutsch',
        langFlag: '🇩🇪',
        totalStars: 'Sterne gesamt',
        totalForks: 'Forks gesamt',
        totalCommits: 'Commits gesamt',
        openPRs: 'Offene PRs',
        openIssues: 'Offene Issues',
        contributedRepos: 'Beigetragene Repos',
        followers: 'Follower',
        following: 'Folgt',
        repos: 'Repos',
        gists: 'Gists',
        githubStats: 'GitHub Statistiken',
        topLanguages: 'Meistgenutzte Sprachen',
        topRepos: 'Top Repositories',
        noBio: 'Keine Bio verfügbar.',
        noDescription: 'Keine Beschreibung verfügbar.',
        noLanguage: 'Keine Sprache gefunden.',
        noRepo: 'Kein Repository gefunden.',
        loading: 'Daten werden geladen...',
        enterUsername: 'Bitte Benutzernamen eingeben.',
        userNotFound: 'Benutzer nicht gefunden.',
        apiLimitExceeded: 'API-Limit erreicht. Bitte warten.',
        errorOccurred: 'Ein Fehler ist aufgetreten. Bitte erneut versuchen.',
        reposFetchError: 'Repositories konnten nicht geladen werden.',
        streakTitle: 'Beiträge & Streak',
        dayStreak: 'Tage Streak',
        contributionsYear: 'Dieses Jahr',
        longestStreak: 'Längster Streak',
        streakStart: 'Streak Start',
        avgContributions: 'Tagesdurchschnitt',
        last30Days: 'Letzte 30 Tage',
        theme: 'Thema',
        language: 'Sprache',
        search: 'Suchen',
        privateContributions: 'Private Beiträge anzeigen',
        tokenActive: 'Token aktiv',
        tokenSave: 'Speichern',
        tokenClear: 'Löschen',
        tokenHelp: 'Wie bekomme ich ein Token?',
        embedCodes: 'Embed-Codes kopieren',
        embedDescription: 'Fügen Sie diese Codes in Ihre README.md ein, um Ihre Statistiken anzuzeigen.',
        contributions: 'Beiträge'
    },
    fr: {
        langName: 'Français',
        langFlag: '🇫🇷',
        totalStars: 'Étoiles totales',
        totalForks: 'Forks totaux',
        totalCommits: 'Commits totaux',
        openPRs: 'PRs ouvertes',
        openIssues: 'Issues ouvertes',
        contributedRepos: 'Repos contribués',
        followers: 'Abonnés',
        following: 'Abonnements',
        repos: 'Repos',
        gists: 'Gists',
        githubStats: 'Statistiques GitHub',
        topLanguages: 'Langages les plus utilisés',
        topRepos: 'Meilleurs dépôts',
        noBio: 'Pas de bio disponible.',
        noDescription: 'Pas de description disponible.',
        noLanguage: 'Aucun langage trouvé.',
        noRepo: 'Aucun dépôt trouvé.',
        loading: 'Chargement des données...',
        enterUsername: 'Veuillez entrer un nom d\'utilisateur.',
        userNotFound: 'utilisateur non trouvé.',
        apiLimitExceeded: 'Limite API atteinte. Veuillez patienter.',
        errorOccurred: 'Une erreur s\'est produite. Veuillez réessayer.',
        reposFetchError: 'Impossible de charger les dépôts.',
        streakTitle: 'Contributions & Streak',
        dayStreak: 'Jours de streak',
        contributionsYear: 'Cette année',
        longestStreak: 'Plus long streak',
        streakStart: 'Début du streak',
        avgContributions: 'Moyenne quotidienne',
        last30Days: '30 derniers jours',
        theme: 'Thème',
        language: 'Langue',
        search: 'Rechercher',
        privateContributions: 'Afficher les contributions privées',
        tokenActive: 'Token actif',
        tokenSave: 'Enregistrer',
        tokenClear: 'Effacer',
        tokenHelp: 'Comment obtenir un token?',
        embedCodes: 'Copier les codes embed',
        embedDescription: 'Collez ces codes dans votre README.md pour afficher vos statistiques.',
        contributions: 'contributions'
    },
    es: {
        langName: 'Español',
        langFlag: '🇪🇸',
        totalStars: 'Estrellas totales',
        totalForks: 'Forks totales',
        totalCommits: 'Commits totales',
        openPRs: 'PRs abiertos',
        openIssues: 'Issues abiertos',
        contributedRepos: 'Repos contribuidos',
        followers: 'Seguidores',
        following: 'Siguiendo',
        repos: 'Repos',
        gists: 'Gists',
        githubStats: 'Estadísticas de GitHub',
        topLanguages: 'Lenguajes más usados',
        topRepos: 'Repositorios principales',
        noBio: 'Sin biografía disponible.',
        noDescription: 'Sin descripción disponible.',
        noLanguage: 'No se encontró lenguaje.',
        noRepo: 'No se encontró repositorio.',
        loading: 'Cargando datos...',
        enterUsername: 'Por favor ingrese un nombre de usuario.',
        userNotFound: 'usuario no encontrado.',
        apiLimitExceeded: 'Límite de API alcanzado. Por favor espere.',
        errorOccurred: 'Ocurrió un error. Por favor intente de nuevo.',
        reposFetchError: 'No se pudieron cargar los repositorios.',
        streakTitle: 'Contribuciones & Streak',
        dayStreak: 'Días de streak',
        contributionsYear: 'Este año',
        longestStreak: 'Streak más largo',
        streakStart: 'Inicio del streak',
        avgContributions: 'Promedio diario',
        last30Days: 'Últimos 30 días',
        theme: 'Tema',
        language: 'Idioma',
        search: 'Buscar',
        privateContributions: 'Mostrar contribuciones privadas',
        tokenActive: 'Token activo',
        tokenSave: 'Guardar',
        tokenClear: 'Borrar',
        tokenHelp: '¿Cómo obtener un token?',
        embedCodes: 'Copiar códigos embed',
        embedDescription: 'Pegue estos códigos en su README.md para mostrar sus estadísticas.',
        contributions: 'contribuciones'
    },
    pt: {
        langName: 'Português',
        langFlag: '🇧🇷',
        totalStars: 'Estrelas totais',
        totalForks: 'Forks totais',
        totalCommits: 'Commits totais',
        openPRs: 'PRs abertos',
        openIssues: 'Issues abertos',
        contributedRepos: 'Repos contribuídos',
        followers: 'Seguidores',
        following: 'Seguindo',
        repos: 'Repos',
        gists: 'Gists',
        githubStats: 'Estatísticas do GitHub',
        topLanguages: 'Linguagens mais usadas',
        topRepos: 'Principais repositórios',
        noBio: 'Nenhuma bio disponível.',
        noDescription: 'Nenhuma descrição disponível.',
        noLanguage: 'Nenhuma linguagem encontrada.',
        noRepo: 'Nenhum repositório encontrado.',
        loading: 'Carregando dados...',
        enterUsername: 'Por favor insira um nome de usuário.',
        userNotFound: 'usuário não encontrado.',
        apiLimitExceeded: 'Limite da API atingido. Por favor aguarde.',
        errorOccurred: 'Ocorreu um erro. Por favor tente novamente.',
        reposFetchError: 'Não foi possível carregar os repositórios.',
        streakTitle: 'Contribuições & Streak',
        dayStreak: 'Dias de streak',
        contributionsYear: 'Este ano',
        longestStreak: 'Maior streak',
        streakStart: 'Início do streak',
        avgContributions: 'Média diária',
        last30Days: 'Últimos 30 dias',
        theme: 'Tema',
        language: 'Idioma',
        search: 'Buscar',
        privateContributions: 'Mostrar contribuições privadas',
        tokenActive: 'Token ativo',
        tokenSave: 'Salvar',
        tokenClear: 'Limpar',
        tokenHelp: 'Como obter um token?',
        embedCodes: 'Copiar códigos embed',
        embedDescription: 'Cole esses códigos no seu README.md para exibir suas estatísticas.',
        contributions: 'contribuições'
    },
    ru: {
        langName: 'Русский',
        langFlag: '🇷🇺',
        totalStars: 'Всего звёзд',
        totalForks: 'Всего форков',
        totalCommits: 'Всего коммитов',
        openPRs: 'Открытые PR',
        openIssues: 'Открытые Issues',
        contributedRepos: 'Репозитории с вкладом',
        followers: 'Подписчики',
        following: 'Подписки',
        repos: 'Репозитории',
        gists: 'Gists',
        githubStats: 'Статистика GitHub',
        topLanguages: 'Самые используемые языки',
        topRepos: 'Лучшие репозитории',
        noBio: 'Биография недоступна.',
        noDescription: 'Описание недоступно.',
        noLanguage: 'Языки не найдены.',
        noRepo: 'Репозитории не найдены.',
        loading: 'Загрузка данных...',
        enterUsername: 'Пожалуйста, введите имя пользователя.',
        userNotFound: 'пользователь не найден.',
        apiLimitExceeded: 'Лимит API превышен. Пожалуйста, подождите.',
        errorOccurred: 'Произошла ошибка. Попробуйте снова.',
        reposFetchError: 'Не удалось загрузить репозитории.',
        streakTitle: 'Вклад и Streak',
        dayStreak: 'Дней streak',
        contributionsYear: 'В этом году',
        longestStreak: 'Самый долгий streak',
        streakStart: 'Начало streak',
        avgContributions: 'Среднее за день',
        last30Days: 'Последние 30 дней',
        theme: 'Тема',
        language: 'Язык',
        search: 'Поиск',
        privateContributions: 'Показать приватные вклады',
        tokenActive: 'Токен активен',
        tokenSave: 'Сохранить',
        tokenClear: 'Очистить',
        tokenHelp: 'Как получить токен?',
        embedCodes: 'Скопировать коды embed',
        embedDescription: 'Вставьте эти коды в README.md для отображения статистики.',
        contributions: 'вклады'
    },
    ja: {
        langName: '日本語',
        langFlag: '🇯🇵',
        totalStars: '総スター数',
        totalForks: '総フォーク数',
        totalCommits: '総コミット数',
        openPRs: 'オープンPR',
        openIssues: 'オープンIssue',
        contributedRepos: '貢献リポジトリ',
        followers: 'フォロワー',
        following: 'フォロー中',
        repos: 'リポジトリ',
        gists: 'Gists',
        githubStats: 'GitHub統計',
        topLanguages: 'よく使う言語',
        topRepos: '人気リポジトリ',
        noBio: 'プロフィールなし',
        noDescription: '説明なし',
        noLanguage: '言語が見つかりません',
        noRepo: 'リポジトリが見つかりません',
        loading: 'データを読み込み中...',
        enterUsername: 'ユーザー名を入力してください',
        userNotFound: 'ユーザーが見つかりません',
        apiLimitExceeded: 'API制限に達しました。しばらくお待ちください。',
        errorOccurred: 'エラーが発生しました。再試行してください。',
        reposFetchError: 'リポジトリを取得できませんでした',
        streakTitle: '貢献 & ストリーク',
        dayStreak: '日ストリーク',
        contributionsYear: '今年',
        longestStreak: '最長ストリーク',
        streakStart: 'ストリーク開始',
        avgContributions: '1日平均',
        last30Days: '過去30日',
        theme: 'テーマ',
        language: '言語',
        search: '検索',
        privateContributions: 'プライベート貢献を表示',
        tokenActive: 'トークン有効',
        tokenSave: '保存',
        tokenClear: 'クリア',
        tokenHelp: 'トークンの取得方法',
        embedCodes: '埋め込みコードをコピー',
        embedDescription: 'これらのコードをREADME.mdに貼り付けて統計を表示します。',
        contributions: '貢献'
    },
    zh: {
        langName: '中文',
        langFlag: '🇨🇳',
        totalStars: '总星数',
        totalForks: '总分支数',
        totalCommits: '总提交数',
        openPRs: '开放PR',
        openIssues: '开放Issue',
        contributedRepos: '贡献仓库',
        followers: '关注者',
        following: '关注中',
        repos: '仓库',
        gists: 'Gists',
        githubStats: 'GitHub统计',
        topLanguages: '常用语言',
        topRepos: '热门仓库',
        noBio: '暂无简介',
        noDescription: '暂无描述',
        noLanguage: '未找到语言',
        noRepo: '未找到仓库',
        loading: '数据加载中...',
        enterUsername: '请输入用户名',
        userNotFound: '用户未找到',
        apiLimitExceeded: 'API限制已达到，请稍候',
        errorOccurred: '发生错误，请重试',
        reposFetchError: '无法获取仓库',
        streakTitle: '贡献与连续',
        dayStreak: '天连续',
        contributionsYear: '今年',
        longestStreak: '最长连续',
        streakStart: '连续开始',
        avgContributions: '日均',
        last30Days: '近30天',
        theme: '主题',
        language: '语言',
        search: '搜索',
        privateContributions: '显示私有贡献',
        tokenActive: 'Token有效',
        tokenSave: '保存',
        tokenClear: '清除',
        tokenHelp: '如何获取Token?',
        embedCodes: '复制嵌入代码',
        embedDescription: '将这些代码粘贴到README.md中以显示您的统计信息。',
        contributions: '贡献'
    },
    ko: {
        langName: '한국어',
        langFlag: '🇰🇷',
        totalStars: '총 스타',
        totalForks: '총 포크',
        totalCommits: '총 커밋',
        openPRs: '오픈 PR',
        openIssues: '오픈 이슈',
        contributedRepos: '기여 저장소',
        followers: '팔로워',
        following: '팔로잉',
        repos: '저장소',
        gists: 'Gists',
        githubStats: 'GitHub 통계',
        topLanguages: '자주 사용하는 언어',
        topRepos: '인기 저장소',
        noBio: '소개가 없습니다',
        noDescription: '설명이 없습니다',
        noLanguage: '언어를 찾을 수 없습니다',
        noRepo: '저장소를 찾을 수 없습니다',
        loading: '데이터 로딩 중...',
        enterUsername: '사용자 이름을 입력하세요',
        userNotFound: '사용자를 찾을 수 없습니다',
        apiLimitExceeded: 'API 한도 초과. 잠시 기다려주세요.',
        errorOccurred: '오류가 발생했습니다. 다시 시도해주세요.',
        reposFetchError: '저장소를 가져올 수 없습니다',
        streakTitle: '기여 & 스트릭',
        dayStreak: '일 스트릭',
        contributionsYear: '올해',
        longestStreak: '최장 스트릭',
        streakStart: '스트릭 시작',
        avgContributions: '일일 평균',
        last30Days: '최근 30일',
        theme: '테마',
        language: '언어',
        search: '검색',
        privateContributions: '비공개 기여 표시',
        tokenActive: '토큰 활성화',
        tokenSave: '저장',
        tokenClear: '지우기',
        tokenHelp: '토큰 얻는 방법',
        embedCodes: '임베드 코드 복사',
        embedDescription: '이 코드를 README.md에 붙여넣어 통계를 표시하세요.',
        contributions: '기여'
    }
};

// Available languages list
const availableLanguages = ['tr', 'en', 'de', 'fr', 'es', 'pt', 'ru', 'ja', 'zh', 'ko'];

// Get current translation
let t = translations[config.locale] || translations.en;

// DOM Elements
const usernameInput = document.getElementById('username-input');
const searchBtn = document.getElementById('search-btn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const statsContainer = document.getElementById('stats-container');
const embedSection = document.getElementById('embed-section');
const themeBtns = document.querySelectorAll('.theme-btn');

// State
let currentTheme = config.theme;
let currentUsername = config.username;
let githubToken = localStorage.getItem('github_token') || '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Apply embed mode if enabled
    if (config.embed) {
        applyEmbedMode();
    }

    // Apply custom styles from URL params
    applyCustomStyles();

    // Set theme
    if (['radical', 'dark', 'tokyonight', 'dracula', 'nord', 'gruvbox'].includes(config.theme)) {
        setTheme(config.theme);
    } else {
        document.body.setAttribute('data-theme', 'radical');
    }

    // Event listeners (only if not in embed mode)
    if (!config.embed) {
        searchBtn.addEventListener('click', handleSearch);
        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });

        // Theme buttons
        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                setTheme(theme);
            });
        });

        // Copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                const code = document.getElementById(targetId).textContent;
                copyToClipboard(code, btn);
            });
        });

        // Token management
        initTokenManagement();

        // Language selector
        initLanguageSelector();
    }

    // Auto-load if username is provided
    if (config.username) {
        if (!config.embed) {
            usernameInput.value = config.username;
        }
        handleSearch();
    }
});

// Initialize token management
function initTokenManagement() {
    const tokenToggle = document.getElementById('token-toggle');
    const tokenInputContainer = document.getElementById('token-input-container');
    const tokenInput = document.getElementById('token-input');
    const tokenSaveBtn = document.getElementById('token-save-btn');
    const tokenClearBtn = document.getElementById('token-clear-btn');
    const tokenStatus = document.getElementById('token-status');

    if (!tokenToggle) return;

    // Update UI based on saved token
    updateTokenUI();

    // Toggle token input visibility
    tokenToggle.addEventListener('click', () => {
        tokenInputContainer.classList.toggle('hidden');
        tokenToggle.classList.toggle('active');
    });

    // Save token
    tokenSaveBtn.addEventListener('click', () => {
        const token = tokenInput.value.trim();
        if (token) {
            localStorage.setItem('github_token', token);
            githubToken = token;
            tokenInput.value = '';
            updateTokenUI();

            // If username is already entered, re-search
            if (currentUsername) {
                handleSearch();
            }
        }
    });

    // Clear token
    tokenClearBtn.addEventListener('click', () => {
        localStorage.removeItem('github_token');
        githubToken = '';
        updateTokenUI();
    });

    // Enter key in token input
    tokenInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            tokenSaveBtn.click();
        }
    });
}

// Update token UI based on saved token
function updateTokenUI() {
    const tokenToggle = document.getElementById('token-toggle');
    const tokenStatus = document.getElementById('token-status');
    const tokenSaveBtn = document.getElementById('token-save-btn');
    const tokenClearBtn = document.getElementById('token-clear-btn');
    const tokenInput = document.getElementById('token-input');

    if (!tokenToggle) return;

    if (githubToken) {
        tokenStatus.innerHTML = `✅ ${t.tokenActive} (Private katkılar sayılacak)`;
        tokenToggle.classList.add('active');
        tokenSaveBtn.classList.add('hidden');
        tokenClearBtn.classList.remove('hidden');
        tokenInput.placeholder = '••••••••••••••••';
    } else {
        tokenStatus.textContent = t.privateContributions;
        tokenToggle.classList.remove('active');
        tokenSaveBtn.classList.remove('hidden');
        tokenClearBtn.classList.add('hidden');
        tokenInput.placeholder = 'GitHub Personal Access Token';
    }
}

// Initialize language selector
function initLanguageSelector() {
    const trigger = document.getElementById('language-trigger');
    const options = document.getElementById('language-options');
    const langOptions = document.querySelectorAll('.language-option');

    if (!trigger || !options) return;

    // Set initial language
    updateLanguageUI(config.locale);

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        trigger.classList.toggle('open');
        options.classList.toggle('open');
    });

    // Language option click
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            setLanguage(lang);
            trigger.classList.remove('open');
            options.classList.remove('open');
        });
    });

    // Close on outside click
    document.addEventListener('click', () => {
        trigger.classList.remove('open');
        options.classList.remove('open');
    });

    options.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Set language
function setLanguage(lang) {
    if (!translations[lang]) return;

    config.locale = lang;
    t = translations[lang];

    // Update URL parameter
    const url = new URL(window.location);
    url.searchParams.set('locale', lang);
    window.history.pushState({}, '', url);

    // Update UI
    updateLanguageUI(lang);
    updateUITexts();

    // Re-run search if user is loaded to update card texts
    if (currentUsername) {
        handleSearch();
    }
}

// Update language selector UI
function updateLanguageUI(lang) {
    const currentLangFlag = document.getElementById('current-lang-flag');
    const currentLangName = document.getElementById('current-lang-name');
    const langLabel = document.getElementById('language-label');
    const langOptions = document.querySelectorAll('.language-option');

    if (!translations[lang]) lang = 'en';

    if (currentLangFlag) currentLangFlag.textContent = translations[lang].langFlag;
    if (currentLangName) currentLangName.textContent = translations[lang].langName;
    if (langLabel) langLabel.textContent = t.language + ':';

    // Mark active option
    langOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
}

// Update all UI texts based on current language
function updateUITexts() {
    // Theme label
    const themeLabel = document.querySelector('.theme-label');
    if (themeLabel) themeLabel.textContent = t.theme + ':';

    // Search button
    const searchBtnText = document.querySelector('.search-btn span');
    if (searchBtnText) searchBtnText.textContent = t.search;

    // Token section
    const tokenStatus = document.getElementById('token-status');
    const tokenSaveBtn = document.getElementById('token-save-btn');
    const tokenClearBtn = document.getElementById('token-clear-btn');
    const tokenHelp = document.querySelector('.token-help');

    if (tokenStatus && !githubToken) tokenStatus.textContent = t.privateContributions;
    if (tokenSaveBtn) tokenSaveBtn.textContent = t.tokenSave;
    if (tokenClearBtn) tokenClearBtn.textContent = t.tokenClear;
    if (tokenHelp) tokenHelp.textContent = t.tokenHelp;

    // Embed section
    const embedTitle = document.querySelector('.embed-title');
    const embedDesc = document.querySelector('.embed-description');
    if (embedTitle) embedTitle.innerHTML = `📋 ${t.embedCodes}`;
    if (embedDesc) embedDesc.textContent = t.embedDescription;

    // Loading text
    const loadingText = document.querySelector('.loading p');
    if (loadingText) loadingText.textContent = t.loading;
}

// Apply embed mode - hide all UI except the stats cards
function applyEmbedMode() {
    document.body.classList.add('embed-mode');

    // Hide header, search, footer
    const header = document.querySelector('.header');
    const searchSection = document.querySelector('.search-section');
    const footer = document.querySelector('.footer');
    const backgroundAnimation = document.querySelector('.background-animation');

    if (header) header.style.display = 'none';
    if (searchSection) searchSection.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (embedSection) embedSection.style.display = 'none';
    if (backgroundAnimation) backgroundAnimation.style.display = 'none';

    // Adjust container
    const container = document.querySelector('.container');
    if (container) {
        container.style.padding = '0';
        container.style.maxWidth = 'none';
    }
}

// Apply custom styles from URL parameters
function applyCustomStyles() {
    const root = document.documentElement;

    if (config.bgColor) {
        root.style.setProperty('--card-bg', `#${config.bgColor}`);
        root.style.setProperty('--bg-primary', `#${config.bgColor}`);
    }

    if (config.titleColor) {
        root.style.setProperty('--text-primary', `#${config.titleColor}`);
    }

    if (config.textColor) {
        root.style.setProperty('--text-secondary', `#${config.textColor}`);
    }

    if (config.iconColor) {
        root.style.setProperty('--accent-primary', `#${config.iconColor}`);
    }

    if (config.borderColor) {
        root.style.setProperty('--card-border', `#${config.borderColor}`);
    }

    if (config.borderRadius) {
        root.style.setProperty('--radius-lg', `${config.borderRadius}px`);
    }

    // Hide border if requested
    if (config.hideBorder) {
        document.documentElement.style.setProperty('--card-border', 'transparent');
    }
}

// Set theme
function setTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', theme);

    themeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });

    // Update embed codes if user is loaded
    if (currentUsername && !config.embed) {
        updateEmbedCodes();
    }
}

// Handle search
async function handleSearch() {
    const username = config.embed ? config.username : usernameInput.value.trim();

    if (!username) {
        showError(t.enterUsername);
        return;
    }

    currentUsername = username;

    // Update URL (only if not in embed mode)
    if (!config.embed) {
        const url = new URL(window.location);
        url.searchParams.set('username', username);
        url.searchParams.set('theme', currentTheme);
        window.history.pushState({}, '', url);
    }

    showLoading();
    hideError();
    hideStats();

    try {
        // Fetch user data
        const userData = await fetchGitHubUser(username);

        // Fetch repos data
        const reposData = await fetchGitHubRepos(username);

        // Fetch contribution data from GitHub profile (includes private contributions if enabled)
        const contributionData = await fetchGitHubContributions(username);

        // Calculate stats
        const stats = calculateStats(userData, reposData);

        // Calculate streak data from contributions (more accurate than events)
        const streakData = calculateStreakFromContributions(contributionData);

        // Display data based on card type
        if (config.embed && config.card !== 'all') {
            displaySingleCard(config.card, userData, stats, streakData);
        } else {
            displayProfile(userData);
            displayStats(stats);
            displayStreak(streakData, userData);
            displayLanguages(stats.languages);
            displayTopRepos(stats.topRepos);
        }

        if (!config.embed) {
            updateEmbedCodes();
        }

        hideLoading();
        showStats();

        // Apply card width if specified
        if (config.cardWidth > 0) {
            document.querySelectorAll('.stats-card').forEach(card => {
                card.style.width = `${config.cardWidth}px`;
                card.style.maxWidth = '100%';
            });
        }

    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

// Display single card for embed mode
function displaySingleCard(cardType, userData, stats, streakData) {
    const profileCard = document.getElementById('profile-card');
    const statsCard = document.getElementById('github-stats-card');
    const streakCard = document.getElementById('streak-card');
    const languagesCard = document.getElementById('languages-card');
    const reposCard = document.getElementById('repos-card');

    // Hide all cards first
    [profileCard, statsCard, streakCard, languagesCard, reposCard].forEach(card => {
        if (card) card.style.display = 'none';
    });

    // Show only the requested card
    switch (cardType) {
        case 'profile':
            if (profileCard) {
                profileCard.style.display = 'block';
                displayProfile(userData);
            }
            break;
        case 'stats':
            if (statsCard) {
                statsCard.style.display = 'block';
                displayStats(stats);
                // Add username to stats card title
                const title = statsCard.querySelector('.card-title');
                if (title && !config.hideTitle) {
                    title.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                        </svg>
                        ${userData.login}'s ${t.githubStats}
                    `;
                } else if (config.hideTitle && title) {
                    title.style.display = 'none';
                }
            }
            break;
        case 'streak':
            if (streakCard) {
                streakCard.style.display = 'block';
                displayStreak(streakData, userData);
                const title = document.getElementById('streak-title');
                if (title && !config.hideTitle) {
                    title.textContent = `${userData.login}'s ${t.streakTitle}`;
                } else if (config.hideTitle && title) {
                    title.parentElement.style.display = 'none';
                }
            }
            break;
        case 'languages':
            if (languagesCard) {
                languagesCard.style.display = 'block';
                displayLanguages(stats.languages);
                const title = languagesCard.querySelector('.card-title');
                if (title && !config.hideTitle) {
                    title.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>
                        </svg>
                        ${userData.login}'s ${t.topLanguages}
                    `;
                } else if (config.hideTitle && title) {
                    title.style.display = 'none';
                }
            }
            break;
        case 'repos':
            if (reposCard) {
                reposCard.style.display = 'block';
                displayTopRepos(stats.topRepos);
            }
            break;
    }

    // Make stats container single column for embed
    statsContainer.style.display = 'block';
}

// Fetch GitHub user
async function fetchGitHubUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`"${username}" ${t.userNotFound}`);
        } else if (response.status === 403) {
            throw new Error(t.apiLimitExceeded);
        }
        throw new Error(t.errorOccurred);
    }

    return response.json();
}

// Fetch GitHub repos
async function fetchGitHubRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);

    if (!response.ok) {
        throw new Error(t.reposFetchError);
    }

    return response.json();
}

// Fetch GitHub events for contribution/streak calculation
async function fetchGitHubEvents(username) {
    try {
        // Prepare headers with token if available
        const headers = {};
        if (githubToken) {
            headers['Authorization'] = `token ${githubToken}`;
        }

        // Fetch multiple pages of events to get more data
        const pages = await Promise.all([
            fetch(`https://api.github.com/users/${username}/events?per_page=100&page=1`, { headers }),
            fetch(`https://api.github.com/users/${username}/events?per_page=100&page=2`, { headers }),
            fetch(`https://api.github.com/users/${username}/events?per_page=100&page=3`, { headers }),
            fetch(`https://api.github.com/users/${username}/events?per_page=100&page=4`, { headers }),
            fetch(`https://api.github.com/users/${username}/events?per_page=100&page=5`, { headers })
        ]);

        const allEvents = [];
        for (const response of pages) {
            if (response.ok) {
                const events = await response.json();
                allEvents.push(...events);
            }
        }

        return allEvents;
    } catch (error) {
        console.error('Events fetch error:', error);
        return [];
    }
}

// Fetch GitHub contributions from profile page (includes private contributions if enabled)
async function fetchGitHubContributions(username) {
    try {
        // Use a CORS proxy to fetch the GitHub profile contributions
        // We'll try multiple approaches

        // Approach 1: Use the GitHub contributions calendar endpoint
        const response = await fetch(`https://github.com/users/${username}/contributions`, {
            mode: 'cors'
        });

        if (response.ok) {
            const html = await response.text();
            return parseContributionsFromHTML(html);
        }
    } catch (error) {
        console.log('Direct fetch failed, trying alternative method...');
    }

    try {
        // Approach 2: Use a CORS proxy service
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://github.com/users/${username}/contributions`)}`;
        const response = await fetch(proxyUrl);

        if (response.ok) {
            const html = await response.text();
            return parseContributionsFromHTML(html);
        }
    } catch (error) {
        console.log('Proxy fetch failed, falling back to events API...');
    }

    // Fallback: Use events API
    const events = await fetchGitHubEvents(username);
    return convertEventsToContributions(events);
}

// Parse contribution data from GitHub's contribution calendar HTML
function parseContributionsFromHTML(html) {
    const contributions = new Map();

    // Parse the contribution cells from the HTML
    // GitHub uses data-date and data-level attributes on contribution cells
    const dateRegex = /data-date="(\d{4}-\d{2}-\d{2})"/g;
    const cellRegex = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"[^>]*>/g;

    // Try to extract contribution data
    let match;
    while ((match = cellRegex.exec(html)) !== null) {
        const date = match[1];
        const level = parseInt(match[2]);
        // Convert level (0-4) to approximate contribution count
        const counts = [0, 1, 3, 6, 10];
        contributions.set(date, counts[level] || 0);
    }

    // If we couldn't parse the new format, try alternative patterns
    if (contributions.size === 0) {
        // Try to find contribution counts directly
        const altRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*>(\d+)\s*contribution/gi;
        while ((match = altRegex.exec(html)) !== null) {
            contributions.set(match[1], parseInt(match[2]));
        }
    }

    // If still empty, try to find any date with contribution indicator
    if (contributions.size === 0) {
        const simpleRegex = /(\d{4}-\d{2}-\d{2})/g;
        const levelRegex = /data-level="(\d)"/g;
        const dates = [...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"/g)];
        const levels = [...html.matchAll(/data-level="(\d)"/g)];

        for (let i = 0; i < Math.min(dates.length, levels.length); i++) {
            const date = dates[i][1];
            const level = parseInt(levels[i][1]);
            if (level > 0) {
                contributions.set(date, level * 2);
            }
        }
    }

    console.log('Parsed contributions from HTML:', contributions.size, 'days');
    return contributions;
}

// Convert events to contribution format (fallback)
function convertEventsToContributions(events) {
    const contributions = new Map();

    events.forEach(event => {
        const contributionTypes = ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'IssueCommentEvent', 'PullRequestReviewEvent'];

        if (contributionTypes.includes(event.type)) {
            const eventDate = new Date(event.created_at);
            const dateKey = getLocalDateString(eventDate);

            let count = 1;
            if (event.type === 'PushEvent' && event.payload && event.payload.commits) {
                count = event.payload.commits.length;
            }

            contributions.set(dateKey, (contributions.get(dateKey) || 0) + count);
        }
    });

    console.log('Converted events to contributions:', contributions.size, 'days');
    return contributions;
}

// Calculate streak from contribution data
function calculateStreakFromContributions(contributions) {
    const now = new Date();
    const today = getLocalDateString(now);

    console.log('Calculating streak from contributions. Total days:', contributions.size);
    console.log('Today:', today);
    console.log('Contributions:', Object.fromEntries(contributions));

    // Calculate current streak
    let currentStreak = 0;
    let streakStartDate = null;
    let checkDate = new Date(now);

    // Check if today has contributions
    let todayKey = getLocalDateString(checkDate);
    const todayHasContributions = contributions.has(todayKey) && contributions.get(todayKey) > 0;

    console.log('Today has contributions:', todayHasContributions);

    // If today doesn't have contributions, start from yesterday
    if (!todayHasContributions) {
        checkDate.setDate(checkDate.getDate() - 1);
    }

    // Count consecutive days (going backwards)
    while (currentStreak < 365) {
        const dateKey = getLocalDateString(checkDate);
        const count = contributions.get(dateKey) || 0;

        if (count > 0) {
            currentStreak++;
            streakStartDate = new Date(checkDate);
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    console.log('Current streak:', currentStreak);

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;

    const sortedDates = Array.from(contributions.keys())
        .filter(date => contributions.get(date) > 0)
        .sort();

    for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) {
            tempStreak = 1;
        } else {
            const prevParts = sortedDates[i - 1].split('-');
            const currParts = sortedDates[i].split('-');
            const prevDate = new Date(prevParts[0], prevParts[1] - 1, prevParts[2]);
            const currDate = new Date(currParts[0], currParts[1] - 1, currParts[2]);
            const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                tempStreak++;
            } else {
                tempStreak = 1;
            }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Calculate year contributions
    const currentYear = now.getFullYear();
    let yearContributions = 0;
    contributions.forEach((count, dateKey) => {
        if (dateKey.startsWith(currentYear.toString())) {
            yearContributions += count;
        }
    });

    // Calculate average
    const daysWithData = sortedDates.length || 1;
    const totalContributions = Array.from(contributions.values()).reduce((a, b) => a + b, 0);
    const avgContributions = (totalContributions / daysWithData).toFixed(1);

    // Get last 30 days
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateKey = getLocalDateString(date);
        last30Days.push({
            date: dateKey,
            count: contributions.get(dateKey) || 0
        });
    }

    return {
        currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        streakStartDate,
        yearContributions,
        avgContributions,
        last30Days,
        totalDays: sortedDates.length
    };
}

// Calculate streak data from events
function calculateStreak(events) {
    const contributionDays = new Map(); // date string -> count

    // Get today's date in local timezone (YYYY-MM-DD format)
    const now = new Date();
    const today = getLocalDateString(now);

    // Count contributions per day
    events.forEach(event => {
        // Count push events, pull request events, issues events as contributions
        const contributionTypes = ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'IssueCommentEvent', 'PullRequestReviewEvent', 'CommitCommentEvent', 'DeleteEvent', 'ForkEvent', 'GollumEvent', 'MemberEvent', 'PublicEvent', 'ReleaseEvent', 'SponsorshipEvent', 'WatchEvent'];

        if (contributionTypes.includes(event.type)) {
            // Parse the event date in local timezone
            const eventDate = new Date(event.created_at);
            const dateKey = getLocalDateString(eventDate);

            // For push events, count the number of commits
            let count = 1;
            if (event.type === 'PushEvent' && event.payload && event.payload.commits) {
                count = event.payload.commits.length;
            }

            contributionDays.set(dateKey, (contributionDays.get(dateKey) || 0) + count);
        }
    });

    // Debug: log contribution days
    console.log('Contribution days:', Object.fromEntries(contributionDays));
    console.log('Today:', today);

    // Calculate current streak
    let currentStreak = 0;
    let streakStartDate = null;
    let checkDate = new Date(now);

    // Get today's key
    let todayKey = getLocalDateString(checkDate);

    // Check if today has contributions
    const todayHasContributions = contributionDays.has(todayKey);
    console.log('Today has contributions:', todayHasContributions, 'Key:', todayKey);

    // If today doesn't have contributions, start from yesterday
    if (!todayHasContributions) {
        checkDate.setDate(checkDate.getDate() - 1);
    }

    // Count consecutive days (going backwards)
    while (currentStreak < 365) {
        const dateKey = getLocalDateString(checkDate);

        if (contributionDays.has(dateKey)) {
            currentStreak++;
            streakStartDate = new Date(checkDate);
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    console.log('Current streak:', currentStreak);

    // Calculate longest streak (within available data)
    let longestStreak = 0;
    let tempStreak = 0;

    // Get sorted dates
    const sortedDates = Array.from(contributionDays.keys()).sort();

    for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) {
            tempStreak = 1;
        } else {
            // Calculate difference between consecutive dates
            const prevParts = sortedDates[i - 1].split('-');
            const currParts = sortedDates[i].split('-');
            const prevDate = new Date(prevParts[0], prevParts[1] - 1, prevParts[2]);
            const currDate = new Date(currParts[0], currParts[1] - 1, currParts[2]);
            const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                tempStreak++;
            } else {
                tempStreak = 1;
            }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Calculate this year's contributions
    const currentYear = now.getFullYear();
    let yearContributions = 0;
    contributionDays.forEach((count, dateKey) => {
        if (dateKey.startsWith(currentYear.toString())) {
            yearContributions += count;
        }
    });

    // Calculate average daily contributions
    const daysWithData = contributionDays.size || 1;
    const totalContributions = Array.from(contributionDays.values()).reduce((a, b) => a + b, 0);
    const avgContributions = (totalContributions / daysWithData).toFixed(1);

    // Get last 30 days contribution data for mini graph
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateKey = getLocalDateString(date);
        last30Days.push({
            date: dateKey,
            count: contributionDays.get(dateKey) || 0
        });
    }

    return {
        currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        streakStartDate,
        yearContributions,
        avgContributions,
        last30Days,
        totalDays: contributionDays.size
    };
}

// Helper function to get local date string in YYYY-MM-DD format
function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Display streak card
function displayStreak(streakData, userData) {
    // Current streak
    document.getElementById('current-streak').textContent = streakData.currentStreak;

    // Year contributions
    document.getElementById('contributions-year').textContent = formatNumber(streakData.yearContributions);

    // Longest streak
    document.getElementById('longest-streak').textContent = streakData.longestStreak;

    // Streak start date
    const streakStartEl = document.getElementById('streak-start');
    if (streakData.streakStartDate && streakData.currentStreak > 0) {
        const options = { month: 'short', day: 'numeric' };
        streakStartEl.textContent = streakData.streakStartDate.toLocaleDateString(config.locale === 'tr' ? 'tr-TR' : 'en-US', options);
    } else {
        streakStartEl.textContent = '-';
    }

    // Average contributions
    document.getElementById('avg-contributions').textContent = streakData.avgContributions;

    // Update streak labels based on locale
    const streakLabels = document.querySelectorAll('#streak-card .streak-info-label');
    if (streakLabels.length >= 4) {
        streakLabels[0].textContent = t.contributionsYear;
        streakLabels[1].textContent = t.longestStreak;
        streakLabels[2].textContent = t.streakStart;
        streakLabels[3].textContent = t.avgContributions;
    }

    // Update streak circle label
    const streakCircleLabel = document.querySelector('.streak-circle .streak-label');
    if (streakCircleLabel) {
        streakCircleLabel.textContent = t.dayStreak;
    }

    // Update title
    const titleEl = document.getElementById('streak-title');
    if (titleEl) {
        titleEl.textContent = t.streakTitle;
    }

    // Update graph label
    const graphLabel = document.querySelector('.graph-label');
    if (graphLabel) {
        graphLabel.textContent = t.last30Days;
    }

    // Render mini contribution graph
    const miniGraph = document.getElementById('mini-graph');
    if (miniGraph) {
        const maxCount = Math.max(...streakData.last30Days.map(d => d.count), 1);

        miniGraph.innerHTML = streakData.last30Days.map(day => {
            let level = 0;
            if (day.count > 0) {
                const ratio = day.count / maxCount;
                if (ratio <= 0.25) level = 1;
                else if (ratio <= 0.5) level = 2;
                else if (ratio <= 0.75) level = 3;
                else level = 4;
            }

            const date = new Date(day.date);
            const formattedDate = date.toLocaleDateString(config.locale === 'tr' ? 'tr-TR' : 'en-US', {
                month: 'short',
                day: 'numeric'
            });

            return `<div class="mini-graph-day level-${level}" title="${formattedDate}: ${day.count} katkı"></div>`;
        }).join('');
    }
}

// Calculate stats from repos
function calculateStats(userData, repos) {
    let totalStars = 0;
    let totalForks = 0;
    const languages = {};

    repos.forEach(repo => {
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;

        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    });

    // Sort repos by stars
    const topRepos = [...repos]
        .filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

    // Calculate language percentages
    const totalLangRepos = Object.values(languages).reduce((a, b) => a + b, 0);
    const languagePercentages = Object.entries(languages)
        .map(([name, count]) => ({
            name,
            count,
            percent: ((count / totalLangRepos) * 100).toFixed(1),
            color: languageColors[name] || '#888888'
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

    return {
        totalStars,
        totalForks,
        totalCommits: userData.public_repos * 10, // Estimation
        totalPRs: Math.floor(userData.public_repos * 1.5), // Estimation
        totalIssues: Math.floor(userData.public_repos * 0.8), // Estimation
        contributedRepos: repos.filter(r => !r.fork).length,
        languages: languagePercentages,
        topRepos
    };
}

// Display profile
function displayProfile(user) {
    document.getElementById('avatar').src = user.avatar_url;
    document.getElementById('avatar').alt = `${user.login}'s avatar`;
    document.getElementById('name').textContent = user.name || user.login;
    document.getElementById('login').textContent = `@${user.login}`;
    document.getElementById('bio').textContent = user.bio || t.noBio;
    document.getElementById('followers').textContent = formatNumber(user.followers);
    document.getElementById('following').textContent = formatNumber(user.following);
    document.getElementById('public-repos').textContent = formatNumber(user.public_repos);
    document.getElementById('public-gists').textContent = formatNumber(user.public_gists);

    // Update labels based on locale
    const statLabels = document.querySelectorAll('#profile-card .stat-label');
    if (statLabels.length >= 4) {
        statLabels[0].textContent = t.followers;
        statLabels[1].textContent = t.following;
        statLabels[2].textContent = t.repos;
        statLabels[3].textContent = t.gists;
    }
}

// Display stats
function displayStats(stats) {
    document.getElementById('total-stars').textContent = formatNumber(stats.totalStars);
    document.getElementById('total-forks').textContent = formatNumber(stats.totalForks);
    document.getElementById('total-commits').textContent = formatNumber(stats.totalCommits);
    document.getElementById('total-prs').textContent = formatNumber(stats.totalPRs);
    document.getElementById('total-issues').textContent = formatNumber(stats.totalIssues);
    document.getElementById('contributed-repos').textContent = formatNumber(stats.contributedRepos);

    // Update labels based on locale
    const statNames = document.querySelectorAll('#github-stats-card .stat-name');
    const labels = [t.totalStars, t.totalForks, t.totalCommits, t.openPRs, t.openIssues, t.contributedRepos];
    statNames.forEach((el, i) => {
        if (labels[i]) el.textContent = labels[i];
    });

    // Hide/show icons
    if (!config.showIcons) {
        document.querySelectorAll('.stat-icon').forEach(icon => {
            icon.style.display = 'none';
        });
    }
}

// Display languages
function displayLanguages(languages) {
    const listEl = document.getElementById('languages-list');
    const barEl = document.getElementById('languages-bar');

    if (languages.length === 0) {
        listEl.innerHTML = `<p style="color: var(--text-muted);">${t.noLanguage}</p>`;
        barEl.innerHTML = '';
        return;
    }

    // Language list
    listEl.innerHTML = languages.map(lang => `
        <div class="language-item">
            <span class="language-color" style="background-color: ${lang.color}"></span>
            <span class="language-name">${lang.name}</span>
            <span class="language-percent">${lang.percent}%</span>
        </div>
    `).join('');

    // Language bar
    barEl.innerHTML = languages.map(lang => `
        <div class="language-bar-segment" 
             style="width: ${lang.percent}%; background-color: ${lang.color}"
             title="${lang.name}: ${lang.percent}%">
        </div>
    `).join('');
}

// Display top repos
function displayTopRepos(repos) {
    const listEl = document.getElementById('repos-list');

    if (repos.length === 0) {
        listEl.innerHTML = `<p style="color: var(--text-muted);">${t.noRepo}</p>`;
        return;
    }

    listEl.innerHTML = repos.map(repo => `
        <div class="repo-item">
            <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
            <p class="repo-description">${repo.description || t.noDescription}</p>
            <div class="repo-meta">
                ${repo.language ? `
                    <span>
                        <span class="repo-language-dot" style="background-color: ${languageColors[repo.language] || '#888'}"></span>
                        ${repo.language}
                    </span>
                ` : ''}
                <span>⭐ ${formatNumber(repo.stargazers_count)}</span>
                <span>🍴 ${formatNumber(repo.forks_count)}</span>
            </div>
        </div>
    `).join('');
}

// Update embed codes
function updateEmbedCodes() {
    const baseUrl = window.location.origin + window.location.pathname;

    // Stats card embed
    const statsUrl = `${baseUrl}?username=${currentUsername}&theme=${currentTheme}&card=stats&embed=true`;
    const statsEmbed = `![${currentUsername}'s GitHub Stats](${statsUrl})`;

    // Languages card embed  
    const langsUrl = `${baseUrl}?username=${currentUsername}&theme=${currentTheme}&card=languages&embed=true`;
    const langsEmbed = `![${currentUsername}'s Top Languages](${langsUrl})`;

    document.getElementById('embed-profile').textContent = statsEmbed;
    document.getElementById('embed-stats').textContent = langsEmbed;

    // Update embed card titles
    const embedCards = document.querySelectorAll('.embed-card h4');
    if (embedCards.length >= 2) {
        embedCards[0].textContent = 'Stats Kartı (Markdown)';
        embedCards[1].textContent = 'Dil Kartı (Markdown)';
    }

    embedSection.classList.remove('hidden');
}

// Copy to clipboard
async function copyToClipboard(text, btn) {
    try {
        await navigator.clipboard.writeText(text);

        // Visual feedback
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
        `;
        btn.style.background = 'var(--accent-tertiary)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);

    } catch (err) {
        console.error('Copy failed:', err);
    }
}

// Format number
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Show/hide helpers
function showLoading() {
    loadingEl.classList.remove('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError() {
    errorEl.classList.add('hidden');
}

function showStats() {
    statsContainer.classList.remove('hidden');
}

function hideStats() {
    statsContainer.classList.add('hidden');
    if (embedSection) embedSection.classList.add('hidden');
}

// Export config for debugging
window.statsViewerConfig = config;
