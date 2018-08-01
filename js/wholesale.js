// get wholesale list from google sheets
fetch(`https://sheets.googleapis.com/v4/spreadsheets/1MF6zwwG2CzQLC6CZKjLQlbjtKwo2xRg0RFHFuJXfn7Q/values/A4:F25?key=AIzaSyCvOIYQw1uwP8uhE9SAhIObDgOIP2pTyXI`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        for(let i = 0; i < data.values.length; i++) {
            if(data.values[i].length > 0) {
                wholesale = Object.assign({}, data.values[i]);
                if(wholesale[5] !== undefined) {
                    $('#wholesale').append(`<tr><td class="img-cell">${wholesale[5]}</td><td>${wholesale[0]}</td><td>${wholesale[1]}</td><td>${wholesale[2]}</td><td>${wholesale[3]}</td><td>${wholesale[4]}</td></tr>`);
                } else {
                    $('#wholesale').append(`<tr><td class="img-cell"><img src="/img/wmbody.png"/></td><td>${wholesale[0]}</td><td>${wholesale[1]}</td><td>${wholesale[2]}</td><td>${wholesale[3]}</td><td>${wholesale[4]}</td></tr>`);
                }  
            }
        }
    });