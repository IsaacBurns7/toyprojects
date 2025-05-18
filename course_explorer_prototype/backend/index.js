const fs = require('fs');
const cheerio = require('cheerio');

(async () => {
    const response = await fetch("https://catalog.tamu.edu/undergraduate/course-descriptions/csce/", {
        method: "GET"
    })
    const html = await response.text();
    const $ = cheerio.load(html);

    $('.courseblock').each((index, element) => {
        const desc = $(element).find('.courseblockdesc');
        desc.before('<button onclick = "togglePopup(this)">Show Description</button>');
        desc.attr('style', 'display: none;');
    })

    const catalog = $('#sc_sccoursedescs').html();
    fs.writeFileSync('index.html', catalog);

    const html2 = fs.readFileSync("index.html", 'utf-8');
    const $2 = cheerio.load(html2);

    const wrappedHtml = `
        <html>
            <head>
                <script src = "interact.js"></script>
            </head>
            <body>
                ${$2.html()}
            </body>
        </html>
    `;

    fs.writeFileSync('index.html', wrappedHtml);

})();