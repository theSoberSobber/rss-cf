let fre = ["tourist"]
// read fre from friends.txt

let final = `
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title>RSS-CF</title>
        <link>http://rss-cf.vercel.app/rss.xml</link>
        <atom:link href="http://rss-cf.vercel.app/rss" rel="self" type="application/rss+xml"/>
`

const addItem = (pname, rating, verdict, tags, cid, sid, handle) => {
    let tag="";
    for(let i=0;i<tags.length;++i){
        tag+=tags[i];
        tag+=',';
    }
    tag = tag.substring(0, tag.length-1);

    final+=
`            <item>
                <name>${pname}</name>
                <rating>${rating}</rating>
                <verdict>${verdict}</verdict>
                <tags>${tag}</tags>
                <link>https://codeforces.com/contest/${cid}/submission/${sid}</link>
                <handle>${handle}</handle>
            </item>
`
}

module.exports = async () => {
    let res;
    for (let i=0;i<fre.length;++i) {
        res = await (await fetch(`https://codeforces.com/api/user.status?handle=${fre[i]}&from=1&count=20`)).json();
        for(let j=0;j<res.result.length;++j){
            for(let k=0;k<res.result[j].author.members.length;++k){
                addItem(res.result[j].problem.name,
                        (res.result[j].problem.rating === undefined) ? "NA" : res.result[j].problem.rating,
                        res.result[j].verdict,
                        res.result[j].problem.tags,
                        res.result[j].contestId,
                        res.result[j].id,
                        res.result[j].author.members[k].handle);
            }
        }
    }
    final+= `
    </channel>
</rss>    
`
    return final;
}

if (require.main === module) {
    // test here the xml parsing
    (async () => {
        xml_res = await require('./parser.js')();
        console.log(xml_res);
    })();
}