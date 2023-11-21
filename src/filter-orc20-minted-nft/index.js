let retrylist = []

const batch = 50;

async function query(id,name){
    try {
        const response = await fetch(`https://api2.ordinalsbot.com/search?hash=${id}`);
        if (!response.ok) {
            retrylist.push(id)
        }
        else {
            const res = await response.json();
            if (res.count === 0) {
                console.log(name)
            }
        }
    }catch (e) {
        retrylist.push(id)
    }
}
for(let i =0; i< items.length;i+=batch){
    const _item = items.slice(i,i+batch)
    const batch_fetch = _item.map((x)=>query(x.id,x.name))
    await Promise.all(batch_fetch)
}



