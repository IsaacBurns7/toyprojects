const fs = require('fs');
const cheerio = require('cheerio');

const createHtml = async () => {
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

};

//
const attachProfessors = async () => {
    const html = fs.readFileSync("index.html", "utf-8");
    const $ = cheerio.load(html);
    const elements = $('.courseblock').toArray();

    for(const element of elements){
        const desc = $(element).find('.courseblockdesc');
        desc.after('<button>Click me to show professors</button>');

        const title = $(element).find('.courseblocktitle');
        const dept = title.text().slice(0,4);
        const number = title.text().slice(5,8);
        console.log(dept, number);
        
        try{
            const anex_data = await getAnexData(dept, number);
            fs.writeFileSync(`${dept}_${number}.json`, JSON.stringify(anex_data, null, 2));
            //<add button and professor list here>
        }catch(error){
            console.error(`Failed for ${dept} ${number}: `, error);
            //note: if this fails, that does mean that there is NO data on this class. Probably is not taught anymore.
        }

        //desc.after(${professor stuff});
    };
}

const getAnexData = async (dept, number) => {
    const params = new URLSearchParams();
    params.append('dept', dept);
    params.append('number', number);
    const response = await fetch('https://anex.us/grades/getData/?', {
        method: 'POST',
        body: params,
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0 Gecko/20100101 Firefox/128.0"
        }
    });
    const anex_data = await response.json();
    return anex_data;
    //fs.writeFileSync('anex.json', JSON.stringify(anex_data, null, 2));
}

createHtml();
getAnexData("CSCE", "110");
attachProfessors();
