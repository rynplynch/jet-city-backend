const Utils = {};
Utils.isObject = x => x !== null && typeof x === "object";
Utils.isObjEmpty = obj => Utils.isObject(obj) && Object.keys(obj).length === 0;

/**
 * tableName: `users`
 * conditions: { id: 'joe-unique-id', ... }
 * data: { username: 'Joe', age: 28, status: 'active', ... }
 *
 *  "UPDATE users SET field_1 = $1, field_2 = $2, field_3 = $3, ... ( WHERE ...) RETURNING *";
 */
 exports.update = (tableName, conditions = {}, fields = {}) => {
    const dKeys = Object.keys(fields);
    const dataTuples = dKeys.map((k, index) => `${k} = COALESCE($${index + 1}, ${k})`);
    const updates = dataTuples.join(", ");
    const len = Object.keys(fields).length;
  
    let text = `UPDATE ${tableName} SET ${updates} `;
  
    if (!Utils.isObjEmpty(conditions)) {
      const keys = Object.keys(conditions);
      const condTuples = keys.map((k, index) => `${k} = $${index + 1 + len} `);
      const condPlaceholders = condTuples.join(" AND ");
  
      text += ` WHERE ${condPlaceholders} RETURNING *`;
    }
  
    const values = [];
    Object.keys(fields).forEach(key => {
      values.push(fields[key]);
    });
    Object.keys(conditions).forEach(key => {
      values.push(conditions[key]);
    });
  
    return { text, values };
  };
  
  exports.select = (tableName, conditions = {}, fields = ["*"]) => {}
  exports.insert = (tableName, fields = {}) => {
    const fKeys = Object.keys(fields);
    const namesKeys = fKeys.map((k) => k);
    const names = namesKeys.join(", ");
    const dataTuples = fKeys.map((k, index) => `$${index + 1}`);
    const inserts = dataTuples.join(", ");
  
    let text = `INSERT INTO ${tableName} (${names}) VALUES (${inserts}) `;
    text += `RETURNING *`;
    console.log(text)
    const values = [];
    Object.keys(fields).forEach(key => {
      values.push(fields[key]);
    });

    return { text, values };
  }
  exports.remove = (tableName, conditions = {}, data = []) => {}