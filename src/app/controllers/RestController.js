const dbFake = [
    {
        name: 11,
        age: 32,
    },
    {
        name: 22,
        age: 01,
    },
    {
        name: 33,
        age: 00,
    },
]

class Rest {
    read(req, res, next) {
        res.json(dbFake);
    }

    create(req, res, next) {
        dbFake.push({ name: 44, age: 21 });
        res.json(dbFake);
    }

    update(req, res, next) {
        dbFake.forEach(user => {
            if(user.name === 22) {
                user.name = 55;
                user.age = 43;
            }
        })
        res.json(dbFake);
    }

    onlyNeedToUpdateOneProperty(req, res, next) {
        dbFake.forEach(user => {
            if(user.name === 22) {
                user.name = 77; // only need to update one property
            }
        })
        res.json(dbFake);
    }

    delete(req, res, next) {
        dbFake.splice(2, 1);
        res.json(dbFake);
    }
}

module.exports = new Rest();









