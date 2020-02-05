const obj = [];

const vehicleType = [
  'plane', 'car', 'train'
]

const dests = [
  {"name":"Minsk","coordinates":{"north":"53.54","east":"27.34"}},
  {"name":"Gomel","coordinates":{"north":"52.26","east":"30.59"}},
  {"name":"Vitebsk","coordinates":{"north":"55.11","east":"30.12"}},
  {"name":"Grodno","coordinates":{"north":"53.40","east":"23.50"}},
  {"name":"Brest","coordinates":{"north":"52.08","east":"23.39"}},
  {"name":"Mogilev","coordinates":{"north":"53.55","east":"30.21"}},
  {"name":"Bobruisk","coordinates":{"north":"53.09","east":"29.14"}},
  {"name":"Lida","coordinates":{"north":"53.53","east":"25.18"}},
  {"name":"Zhlobin","coordinates":{"north":"52.54","east":"30.02"}},
  {"name":"Slutsk","coordinates":{"north":"53.02","east":"27.34"}}
]

function rand(a,b) {
  return Math.round(Math.random() * (b - a) + a);
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    obj.push({
      destination: dests[i],
      date: (new Date(2020, rand(0, 11), rand(1, 30))).toDateString(),
      type: vehicleType[rand(0,2)]
    })
  }
}

console.log(JSON.stringify(obj));