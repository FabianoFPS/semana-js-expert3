import assert from 'assert';
import faker from 'faker';

export function setAPI() {

  const MAX_ITEMS = 10;
  const EVEN_MULTIPLE = 2;

  function isEvenNumber(numberTest) {
    return !(numberTest % EVEN_MULTIPLE);
  }

  const generateCar = (mainDB, replicationDB) => {

    for (let index = 0; index < MAX_ITEMS; index++) {
      const car = {
        name: faker.vehicle.model(),
        releaseYear: faker.date.past(),
        available: true,
        gasAvailable: true,
      }

      mainDB.add(car);
      // console.log('É PAR', index, isEvenNumber(index));
      if(!isEvenNumber(index) || !replicationDB) continue;
      replicationDB.add(car);
    }

    return mainDB;
  }
  
  const carsDB1 = generateCar(new Set());
  const carsDB2 = generateCar(new Set(), carsDB1);

  assert.deepStrictEqual(carsDB1.size, MAX_ITEMS + MAX_ITEMS / EVEN_MULTIPLE);
  assert.deepStrictEqual(carsDB2.size, MAX_ITEMS);

  const replications = new Set(
    [...carsDB1].filter(car => carsDB2.has(car))
  );
  assert.deepStrictEqual(replications.size, MAX_ITEMS / EVEN_MULTIPLE);
  
  const uniqueFromDB1 = new Set(
    [...carsDB1].filter(car => !carsDB2.has(car))
  );
  assert.deepStrictEqual(uniqueFromDB1.size, MAX_ITEMS);

  const uniqueFromDB2 = new Set(
    [...carsDB2].filter(car => !carsDB1.has(car))
  );
  assert.deepStrictEqual(uniqueFromDB2.size, MAX_ITEMS / EVEN_MULTIPLE);
  
  const allDatabaseWithoutReplications = new Set([...carsDB1, ...carsDB2]);
  assert.deepStrictEqual(allDatabaseWithoutReplications.size, MAX_ITEMS *  EVEN_MULTIPLE);

  for(const item of carsDB1) carsDB2.add(item);
  assert.deepStrictEqual(carsDB2.size, MAX_ITEMS *  EVEN_MULTIPLE)

  console.log('unique items on BD1 that not include in DB2', uniqueFromDB1.size);
  console.log('unique items on BD2 that not include in DB1', uniqueFromDB2.size);
  
  console.log('repicated data', replications.size);
  console.log('unique items on all BDs', allDatabaseWithoutReplications.size);
}