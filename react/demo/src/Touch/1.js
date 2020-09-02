const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
function fetch(data) {
  return delay(3000).then(() => {
    console.log(2);
    return data;
  });
}

const getData = fn => {
    const cache = {};
    return (url) => {
        if(cache[url]) {
            return cache[url];
        }
        cache[url] = fn(url);
        Promise.resolve().then(() => {
            delete cache[url];
        })
        return cache[url]
    }
}

const cachePromise = getData(fetch)

cachePromise('3').then((a) => {
    console.log(a);
  });
cachePromise('2').then((a) => {
    console.log(a);
});

// delay(3000).then(() => {
//     cachePromise('get').then((a) => {
//         console.log(a);
//       });
//     cachePromise('get').then((a) => {
//         console.log(a);
//     });
// })