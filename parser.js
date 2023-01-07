let fre = ["tourist"]
// read fre from friends.txt

module.exports = async () => {
    let res, final;
    for (let i=0;i<fre.length;++i) {
        res = await (await fetch(`https://codeforces.com/api/user.status?handle=${fre[i]}`)).text();
        final+=res;
    }
    return final;
}

if (require.main === module) {
    // test here the xml parsing
    (async () => {
        xml_res = await require('./parser.js')();
        console.log(xml_res);
    })();
}