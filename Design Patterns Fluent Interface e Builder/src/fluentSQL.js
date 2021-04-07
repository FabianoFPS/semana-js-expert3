export class FluentSQLBuilder {
  #database = []
  #limit = 0;
  #select = [];
  #where = [];
  #orderBy = '';

  constructor({ database }) {
    this.#database = database;
  }

  static for(database) {
    return new FluentSQLBuilder({ database });
  }

  limit(max) {
    this.#limit = max;
    return this;
  }

  select(props) {
    this.#select = props;
    return this;
  }

  where(query){
    const [[prop, selectedValue]] = Object.entries(query);
    this.#where = query;
    return this;
  }

  orderBy(field) {
    this.#orderBy = field;
    return this;
  }

  #performLimit(result) {
    return this.#limit && result.length === this.#limit;
  }
 
  #performWhere(item) {
    
  }

  build() {
    const results = [];
    for(const item of this.#database) {
      results.push(item);
      if(!this.#performWhere(item)) continue;
      if(this.#performLimit(results)) break;
    }
    return results;
  }
}
