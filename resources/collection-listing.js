'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a CollectionListing instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function CollectionListing(shopify) {
  this.shopify = shopify;

  this.name = 'collection_listings';
  this.key = 'collection_listing';
}

assign(CollectionListing.prototype, pick(base, [
  'get',
  'create',
  'list',
  'buildUrl'
]));

/**
 * Retrieves product IDs that are published to a particular collection.
 *
 * @param {Number} id Collection ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CollectionListing.prototype.productIds = function productIds(id) {
  const url = this.buildUrl(`${id}/product_ids`);
  return this.shopify.request(url, 'GET', 'product_ids');
};

/**
 * Creates a collection listing.
 *
 * @param {Number} collectionId The ID of the collection to publish
 * @param {Object} [params] Body parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CollectionListing.prototype.create = function create(collectionId, params) {
  params || (params = { collection_id: collectionId });
  const url = this.buildUrl(collectionId);
  return this.shopify.request(url, 'PUT', this.key, params);
};

module.exports = CollectionListing;
