
let link = "http://localhost:3000/app/read";
let html = document.querySelector('.data');

fetch(link)
    .then(response => {
        return response.json();
    })
    .then(datas => {
        datas.forEach(data => {
            const div = document.createElement('div');
            const child = `
                        <h3>${data.name}</h3>
                        <p>${data.age}</p>
                `;
            div.innerHTML = child;
            html.appendChild(div)
        })
        console.log(datas);
    })









