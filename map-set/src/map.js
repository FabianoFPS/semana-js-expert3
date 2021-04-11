import assert from 'assert';


function mapAPI() {

  // instanciar
  const itemObj = { name: 'fabiano' };
  const itemMap = new Map([
    ['name', 'fabiano']
  ]);
  
  // criar atributo
  itemObj.birthDay = '19/05/1984';
  assert.ok(itemObj.birthDay === '19/05/1984');

  itemMap.set('birthDay', '19/05/1984');
  assert.deepStrictEqual(itemMap.get('birthDay'), '19/05/1984');

  // verificar a existencia do atributo
  assert.ok(itemObj.hasOwnProperty('birthDay'));
  
  assert.ok(itemMap.has('birthDay'));
  
  // deletar atributo
  delete itemObj.birthDay;
  assert.ok(itemObj.hasOwnProperty('birthDay') === false);
  
  itemMap.delete('birthDay');
  assert.ok(itemMap.has('birthDay') === false);

  // quantidade de atributos
  assert.deepStrictEqual(Object.keys(itemObj).length, 1);
  assert.deepStrictEqual(itemMap.size, 1);

  // object | map para array
  assert.deepStrictEqual(Object.entries(itemObj), [['name', 'fabiano']]);

  assert.deepStrictEqual([...itemMap], [['name', 'fabiano']]);

  // interando ...
  for(const [key, value] of Object.entries(itemObj)) {
    assert.deepStrictEqual([key, value], ['name', 'fabiano']);
  }
  
  for(const [key, value] of itemMap) {
    assert.deepStrictEqual([key, value], ['name', 'fabiano']);
  }

  // deletar todos os atributos
  Object.keys(itemObj).map(key => delete itemObj[key]);
  assert.deepStrictEqual(Object.keys(itemObj), []);
  
  itemMap.clear();
  assert.deepStrictEqual([...itemMap.keys()], []);


  // console.log('FINAL:', itemObj, itemMap);
  
}

export { mapAPI }
