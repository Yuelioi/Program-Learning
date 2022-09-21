var pl = [
    {
        id: 001,
        name: "apple",
        age: 15,
    },
    {
        id: 002,
        name: "peach",
        age: 25,
    },
    {
        id: 003,
        name: "alice",
        age: 20,
    },
];
pl.sort((a, b) => {
    // console.log(a.age - b.age)
    // return a.age < b.age;
    return (a.age - b.age);
});
console.log(pl);

