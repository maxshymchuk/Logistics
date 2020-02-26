const args = process.argv.slice(2);
const fs = require('fs');

const vehicleType = ['Plane', 'Car', 'Train'];

const locations = [
  { name: 'Minsk', coordinates: { lat: 53.9, lon: 27.566667 } },
  { name: 'Gomel', coordinates: { lat: 52.445278, lon: 30.984167 } },
  { name: 'Vitebsk', coordinates: { lat: 55.191667, lon: 30.205556 } },
  { name: 'Grodno', coordinates: { lat: 53.666667, lon: 23.833333 } },
  { name: 'Brest', coordinates: { lat: 52.134722, lon: 23.656944 } },
  { name: 'Mogilev', coordinates: { lat: 53.916667, lon: 30.35 } }
];

function rand(a, b) {
  return Math.round(Math.random() * (b - a) + a);
}

function genLocations() {
  let list = '';
  for (let i = 0; i < locations.length; i++) {
    list += `${JSON.stringify(locations[i])}\n`;
  }
  return list;
}

function genVehicles(amount = 100) {
  let list = '';
  const today = new Date();
  for (let i = 0; i < amount; i++) {
    list += `${JSON.stringify({
      destination: locations[rand(0, locations.length - 1)],
      arrivalDate: +new Date(today.getFullYear(), rand(today.getMonth(), 11), rand(today.getDate(), 30)),
      type: vehicleType[rand(0, 2)]
    })}\n`;
  }
  return list;
}

switch (args[0]) {
  case 'vehicles':
    fs.writeFile('vehicles.json', genVehicles(args[1]), function(err) {
      if (err) throw err;
      console.log('Saved!');
    });
    break;
  case 'locations':
    fs.writeFile('locations.json', genLocations(), function(err) {
      if (err) throw err;
      console.log('Saved!');
    });
    break;
}
