"use strict";
const path = require("path");
const fetch = require("node-fetch");
const Promise = require("bluebird");
const toCamelCase = require("camelcase-keys");
const objectAssign = require("object-assign");
const { error, success, debug, httpUtil } = require("util-box");
const HOMEDIR = path.join(__dirname, "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const apiConfiguration = require(path.join(HOMEDIR, "config", "api.config"));
const CONSTANTS = apiConfiguration.constants;
const Locator = require(path.join(SRCDIR, "util", "locator.util"));
const Podcast = require(path.join(SRCDIR, "models")).Podcast;
const Tag = require(path.join(SRCDIR, "models")).Tag;

class PublicApi {
	constructor() {
		const locator = new Locator();
		this._locator = locator;
	}

	/**
	 * Converts snake_case JSON array into a camelCased object of specified model
	 * @param {array} input - JSON array from gpodder.net web service
	 * @param {model} model - output model to convert the array into
	 */
	_toDataModel(input, model) {
		let output = {};
		input = toCamelCase(input);
		return new Promise((resolve, reject) => {
			if (Array.isArray(input) && input.length > 0) {
				input.map((x, index) => {
					model.getRequiredFields().map(key => {
						if (!x.hasOwnProperty(key)) {
							reject(new Error(`Missing required keys for ${model.getName()}`));
						}
					});
					let dataModel = objectAssign(new model(), x);
					output[index] = dataModel;
				});
				resolve(output);
			}
			resolve(input);
		});
	}

	/**
	 * Get a list of most-subscribed podcasts of a Tag
	 * @param {number} count - (optional) number of podcasts returned. Default = 50. Range = 1 (minimum) to 100 (maximum)
	 * @returns {object} - a list of podcast objects
	 */
	getTopList(count = CONSTANTS.TOPLIST_DEFAULT, format = null) {
		const response_format = format || CONSTANTS.FORMAT_DEFAULT
		return new Promise((resolve, reject) => {
			fetch(this._locator.toplistUri(count, response_format))
				.then(response => httpUtil.handleApiResponse(response))
				.then(podcastArray => resolve(this._toDataModel(podcastArray, Podcast)))
				.catch(err => reject(err));
		});
	}

		/**
	 * Get a list of top tags
	 * @param {number} count - (optional) number of tags returned. Default = 50. Range = 1 (minimum) to 100 (maximum)
	 * @returns {object} - a list of podcast objects
	 */
	getTopTags(count = CONSTANTS.TOPLIST_DEFAULT) {
		return new Promise((resolve, reject) => {
			fetch(this._locator.toptagsUri(count, CONSTANTS.FORMAT_DEFAULT))
				.then(response => httpUtil.handleApiResponse(response))
				.then(tagArray => resolve(this._toDataModel(tagArray, Tag)))
				.catch(err => reject(err));
		});
	}

	/**
	 * Search for podcasts on the webservice
	 * @param {string} query - podcast search query
	 * @returns {array} - an array of podcast objects
	 */
	searchPodcasts(query, format = null, options = {}) {
		const response_format = format || CONSTANTS.FORMAT_DEFAULT;
		return new Promise((resolve, reject) => {
			if (!query) {
				reject(new Error("Missing or invalid parameters: query"));
			} else {
				fetch(this._locator.searchUri(query, response_format, options))
					.then(response => httpUtil.handleApiResponse(response))
					.then(podcastArray => resolve(this._toDataModel(podcastArray, Podcast)))
					.catch(err => reject(err));
			}
		});
	}

	/**
	 * Get a list of most-subscribed podcasts of a Tag
	 * @param {string} tag - a valid tag
	 * @param {number} count - (optional) number of podcasts to be returned. Default = 50. Range = 1 (minimum) to 100 (maximum)
	 */
	getPodcastsOfATag(tag, count = CONSTANTS.TOPLIST_DEFAULT) {
		return new Promise((resolve, reject) => {
			if (!tag) {
				reject(new Error("Missing or invalid parameters: tag"));
			} else {
				fetch(this._locator.podcastsOfATagUri(tag, count))
					.then(response => httpUtil.handleApiResponse(response))
					.then(podcastArray => resolve(this._toDataModel(podcastArray, Podcast)))
					.catch(err => reject(err));
			}
		});
	}

	/**
	 * Get Metadata for the specified Podcast
	 * @param {string} podcastUri - a valid podcast URL
	 * @returns {object} - An object consisting of podcast metadata
	 */
	getPodcastData(podcastUri) {
		return new Promise((resolve, reject) => {
			if (!podcastUri) {
				reject(new Error("Missing or invalid parameters: podcastUri"));
			} else {
				fetch(this._locator.podcastDataUri(podcastUri))
					.then(response => httpUtil.handleApiResponse(response))
					.then(podcast => resolve(this._toDataModel(podcast, Podcast)))
					.catch(err => reject(err));
			}
		});
	}

	getEpisodeData(podcastUri, episodeUri) {
		return new Promise((resolve, reject) => {
			if (!podcastUri || !episodeUri) {
				reject(new Error("Missing or invalid parameters: podcastUri, episodeUri"));
			} else {
				fetch(this._locator.episodeDataUri(podcastUri, episodeUri))
					.then(response => httpUtil.handleApiResponse(response))
					.then(podcast => resolve(this._toDataModel(podcast, Podcast)))
					.catch(err => reject(err));
			}
		});
	}
}

module.exports = new PublicApi();
