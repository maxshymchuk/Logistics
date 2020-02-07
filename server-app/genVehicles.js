const obj = [];

const vehicleType = [
  'Plane', 'Car', 'Train'
]

const dests = [
  {"name":"Minsk","coordinates":{"lat":"53.9","lon":"27.566667"}},
  {"name":"Gomel","coordinates":{"lat":"52.445278","lon":"30.984167"}},
  {"name":"Vitebsk","coordinates":{"lat":"55.191667","lon":"30.205556"}},
  {"name":"Grodno","coordinates":{"lat":"53.666667","lon":"23.833333"}},
  {"name":"Brest","coordinates":{"lat":"52.134722","lon":"23.656944"}},
  {"name":"Mogilev","coordinates":{"lat":"53.916667","lon":"30.35"}},
  {"name":"Bobruisk","coordinates":{"lat":"53.15","lon":"29.233333"}},
  {"name":"Lida","coordinates":{"lat":"53.883333","lon":"25.3"}},
  {"name":"Zhlobin","coordinates":{"lat":"52.9","lon":"30.033333"}},
  {"name":"Slutsk","coordinates":{"lat":"53.033333","lon":"27.566667"}}
]

function rand(a,b) {
  return Math.round(Math.random() * (b - a) + a);
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    obj.push({
      destination: dests[i],
      date: '' + Date.parse(new Date(2020, rand(0, 11), rand(1, 30))),
      type: vehicleType[rand(0,2)]
    })
  }
}

console.log(JSON.stringify(obj));