/**
 * Save new object
 * @param body
 * @returns {Promise<any>}
 */
export const save = (body: any): Promise<any> =>
  new Promise((resolve, reject) => {
    body
      .save()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Find a object
 * @param model
 * @param query
 * @param projection
 * @returns {Promise<any>}
 */
export const findOne = (model: any, query: any, projection?: any): any =>
  new Promise((resolve, reject) => {
    model
      .findOne(query, projection)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Find many objects
 * @param model
 * @param query
 * @param projection
 * @param options
 * @returns {Promise<[]>}
 */
export const findMany = (model, query, projection?, options?): Promise<Array<any>> =>
  new Promise((resolve, reject) => {
    model
      .find(query, projection, options)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Find objects by aggregate query
 * @param model
 * @param query
 * @returns {Promise<unknown>}
 */
export const findByAggregateQuery = (model, query): Promise<any> =>
  new Promise((resolve, reject) => {
    model
      .aggregate(query)
      .allowDiskUse(true)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Update one object
 * @param model
 * @param query
 * @param body
 * @param options
 * @returns {Promise<unknown>}
 */
export const updateOne = (model, query, body?, options?): Promise<any> =>
  new Promise((resolve, reject) => {
    model
      .findOneAndUpdate(query, body, options)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Update many objects
 * @param model
 * @param query
 * @param body
 * @param options
 * @returns {Promise<unknown>}
 */
export const updateMany = (model, query, body, options?) =>
  new Promise((resolve, reject) => {
    model
      .updateMany(query, body, options)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Count documents
 * @param model
 * @param query
 * @param options
 * @returns {Promise<unknown>}
 */
export const countDocuments = (model, query, options) =>
  new Promise((resolve, reject) => {
    model
      .countDocuments(query, options)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * insert many objects
 * @param model
 * @param data
 * @param options
 * @returns {Promise<unknown>}
 */
export const insertMany = (model, data, options) =>
  new Promise((resolve, reject) => {
    model
      .insertMany(data, options)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * DELETE object
 * @input {objId}
 * @output {object}
 */
export const removeObject = (model, query) =>
  new Promise((resolve, reject) => {
    model
      .findByIdAndDelete(query)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
