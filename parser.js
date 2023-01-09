// let fre = [
// "theSoberSobber", "yashmahale5", "apcc_25", "Pi-Pikachuuu", "Anish888", "ishanmujumdar", "manusingh5oct", "007Yashwant",
// "pawanrawat", "Akhilendra11", "the-sanyam", "rajneeshupsc32", "Tanishk_795", "kush1505", "PRABHAV_27", "anand_patel_91",
// "ramabhala07", "Ozzzz53", "himanshu13162", "aditi_2907", "Sangram_Singh_03", "yadav_ravi", "Ssatyam", "Akshat7142", "rakeshkundankps",
// "mohtayushi", "utsavgupta8770", "divyanshujajoo1", "divyan2003", "kinshuk_khare", "aniket_aman", "sahilpandey217", "aditya0610",
// "Sassassin", "RaghuRai", "vinay211113233", "Ashay95", "priyanshisharma2678", "it_is_possible", "ramankethoriya63", "hemantlodha1000"
// ]
let fre = [
    "yashmahale5", "divyanshujajoo1", "rakeshkundankps", "Akhilendra11", "aditya0610", "apcc_25"
]
// read fre from friends.txt

let final = `
<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:cf="https://nyaa.si/xmlns/nyaa">
    <channel>
        <title>RSS-CF</title>
        <link>http://rss-cf.vercel.app/rss.xml</link>
        <atom:link href="http://rss-cf.vercel.app/rss" rel="self" type="application/rss+xml"/>
`
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const addItem = (pname, rating, verdict, tags, cid, sid, handle) => {
    let tag="";
    for(let i=0;i<tags.length;++i){
        tag+=tags[i];
        tag+=',';
    }   
    tag = tag.substring(0, tag.length-1);

    final+=
`            <item>
                <title>${pname}</title>
                <cf:rating>${rating}</cf:rating>
                <cf:verdict>${verdict}</cf:verdict>
                <cf:tags>${tag}</cf:tags>
                <link>https://codeforces.com/contest/${cid}/submission/${sid}</link>
                <cf:handle>${handle}</cf:handle>
            </item>
`
}

export const make = async () => {
    let res;
    for (let i=0;i<fre.length;++i) {
        try{
            res = await (await fetch(`https://codeforces.com/api/user.status?handle=${fre[i]}&from=1&count=15`)).json();
            delay(10000);
        } catch(err){
            console.log(err);
        }
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

// module.exports = {
//     make
// }

// if (require.main === module) {
//     // test here the xml parsing
//     // (async () => {
//     //     xml_res = await require('./parser.js')();
//     //     console.log(xml_res);
//     // })();
// }