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

  const dataTuples = dKeys.map((k, index) => 
      `${k} = COALESCE($${index + 1}, ${k}
    )`);

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
  
exports.select = (tableName, conditions = {}, column) => {
  const values = [];
  let text = ``;

  if (column === undefined)  text += `SELECT * FROM ${tableName}`
  else text += `SELECT ${column} FROM ${tableName}`

  if (!Utils.isObjEmpty(conditions)) {
    const keys = Object.keys(conditions);
    keys.forEach(key => {
      values.push(conditions[key]);
    });
    const condTuples = keys.map((k, index) => `${k} = $${index + 1} `);
    const condPlaceholders = condTuples.join(" AND ");

    text += ` WHERE ${condPlaceholders} `;
    
    
  }
  else text += ` ORDER BY id ASC`

  return { text, values };
}

exports.insert = (tableName, fields = {}) => {
  const fKeys = Object.keys(fields);
  const fieldNames = fKeys.map((k) => k);
  const namesString = fieldNames.join(", ");
  const dataTuples = fKeys.map((k, index) => `$${index + 1}`);
  const tuplesString = dataTuples.join(", ");

  let text = `INSERT INTO ${tableName} (${namesString}) VALUES (${tuplesString}) `;
  text += `RETURNING *`;

  const values = [];
  Object.keys(fields).forEach(key => {
    values.push(fields[key]);
  });

  return { text, values };
}

exports.remove = (tableName, conditions, field) => {
  let text = `DELETE FROM ${tableName} WHERE "${field}" IN (${conditions});` ;

  return { text };
}