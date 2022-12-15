const http = require("http");
const url = "https://time.com";
const fetch = require("node-fetch");
const server = http.createServer(async (req, res) => {
    await getContent(req, res);
});

let getContent = async(req, res)=>{
    await fetch(url)
    .then(function(response) {
        return response.text()
    })
    .then(async function(html) {
        let ans = html.substring(html.indexOf("<html"), html.indexOf('<body') ) + '<body>';
        let str = html.indexOf('<div class="partial latest-stories" data-module_name="Latest Stories">');
        str = html.substring(str);
        str = str.substring(0, str.indexOf("</div>") + "</div>".length);
        ans = ans +str + "</body> </html>";
        res.writeHead(200, {"Content-type" : "text/html"})
        res.end(ans);
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    }); 

}

server.listen(8080, "127.0.0.1", () => {
    console.log("listen on port 8080");
});