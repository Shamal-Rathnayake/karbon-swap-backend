"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeObject = exports.insertMany = exports.countDocuments = exports.updateMany = exports.updateOne = exports.findByAggregateQuery = exports.findMany = exports.findOne = exports.save = void 0;
/**
 * Save new object
 * @param body
 * @returns {Promise<any>}
 */
const save = (body) => new Promise((resolve, reject) => {
    body
        .save()
        .then((data) => {
        resolve(data);
    })
        .catch((err) => {
        reject(err);
    });
});
exports.save = save;
/**
 * Find a object
 * @param model
 * @param query
 * @param projection
 * @returns {Promise<any>}
 */
const findOne = (model, query, projection) => new Promise((resolve, reject) => {
    model
        .findOne(query, projection)
        .then((data) => {
        resolve(data);
    })
        .catch((err) => {
        reject(err);
    });
});
exports.findOne = findOne;
/**
 * Find many objects
 * @param model
 * @param query
 * @param projection
 * @param options
 * @returns {Promise<[]>}
 */
const findMany = (model, query, projection, options) => new Promise((resolve, reject) => {
    model
        .find(query, projection, options)
        .then((data) => {
        resolve(data);
    })
        .catch((err) => {
        reject(err);
    });
});
exports.findMany = findMany;
/**
 * Find objects by aggregate query
 * @param model
 * @param query
 * @returns {Promise<unknown>}
 */
const findByAggregateQuery = (model, query) => new Promise((resolve, reject) => {
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
exports.findByAggregateQuery = findByAggregateQuery;
/**
 * Update one object
 * @param model
 * @param query
 * @param body
 * @param options
 * @returns {Promise<unknown>}
 */
const updateOne = (model, query, body, options) => new Promise((resolve, reject) => {
    model
        .findOneAndUpdate(query, body, options)
        .then((data) => {
        resolve(data);
    })
        .catch((err) => {
        reject(err);
    });
});
exports.updateOne = updateOne;
/**
 * Update many objects
 * @param model
 * @param query
 * @param body
 * @param options
 * @returns {Promise<unknown>}
 */
const updateMany = (model, query, body, options) => new Promise((resolve, reject) => {
    model
        .updateMany(query, body, options)
        .then((data) => {
        resolve(data);
    })
        .catch((err) => {
        reject(err);
    });
});
exports.updateMany = updateMany;
/**
 * Count documents
 * @param model
 * @param query
 * @param options
 * @returns {Promise<unknown>}
 */
const countDocuments = (model, query, options) => new Promise((resolve, reject) => {
    model
        .countDocuments(query, options)
        .then((data) => {
        resolve(data);
    })
        .catch((err) => {
        reject(err);
    });
});
exports.countDocuments = countDocuments;
/**
 * insert many objects
 * @param model
 * @param data
 * @param options
 * @returns {Promise<unknown>}
 */
const insertMany = (model, data, options) => new Promise((resolve, reject) => {
    model
        .insertMany(data, options)
        .then((data) => {
        resolve(data);
    })
        .catch((err) => {
        reject(err);
    });
});
exports.insertMany = insertMany;
/**
 * DELETE object
 * @input {objId}
 * @output {object}
 */
const removeObject = (model, query) => new Promise((resolve, reject) => {
    model
        .findByIdAndDelete(query)
        .then((data) => {
        resolve(data);
    })
        .catch((err) => {
        reject(err);
    });
});
exports.removeObject = removeObject;
