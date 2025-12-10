<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Stats</title>
    <style>
        body {
            background: #0d1117;
            font-family: -apple-system, sans-serif;
            color: white;
            padding: 40px;
            text-align: center;
        }

        h1 {
            color: #fe428e;
            margin-bottom: 30px;
        }

        h2 {
            color: #8b949e;
            font-size: 1rem;
            margin: 20px 0 10px;
        }

        iframe {
            border: none;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            margin: 10px;
        }

        .cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }
    </style>
</head>

<body>
    <h1>🚀 GitHub İstatistiklerim</h1>

    <div class="cards">
        <div>
            <h2>Genel Stats</h2>
            <iframe src="https://gafsdoy85.github.io/test/index.html?username=switlydev&mode=general&theme=radical"
                width="495" height="195"></iframe>
        </div>

        <div>
            <h2>Streak</h2>
            <iframe src="https://gafsdoy85.github.io/test/index.html?username=switlydev&mode=streak&theme=dracula"
                width="495" height="195"></iframe>
        </div>

        <div>
            <h2>Diller</h2>
            <iframe src="https://gafsdoy85.github.io/test/index.html?username=switlydev&mode=languages&theme=tokyonight"
                width="495" height="195"></iframe>
        </div>
    </div>
</body>

</html>
