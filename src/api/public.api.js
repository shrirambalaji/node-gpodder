"use strict";
const fetch = require("cross-fetch");
const toCamelCase = require("camelcase-keys");
const { handleApiResponse } = require("../util/http.util");
const Locator = require("../util/locator.util");
const apiConfiguration = require("../../config/api.config");
const CONSTANTS = apiConfiguration.constants;

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

	/**
	 * Get a list of most-subscribed podcasts of a Tag
	 * @param {number} count - (optional) number of podcasts returned. Default = 50. Range = 1 (minimum) to 100 (maximum)
	 * @returns {object} - a list of podcast objects
	 */
	getTopList(count = CONSTANTS.TOPLIST_DEFAULT, format = null) {
		const response_format = format || CONSTANTS.FORMAT_DEFAULT;
		return new Promise((resolve, reject) => {
			fetch(this._locator.toplistUri(count, response_format))
				.then(response => handleApiResponse(response))
				.then(podcastArray => resolve(toCamelCase(podcastArray)))
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
				.then(response => handleApiResponse(response))
				.then(tagArray => resolve(toCamelCase(tagArray)))
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
					.then(response => handleApiResponse(response))
					.then(podcastArray => resolve(toCamelCase(podcastArray)))
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
					.then(response => handleApiResponse(response))
					.then(podcastArray => resolve(toCamelCase(podcastArray)))
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
					.then(response => handleApiResponse(response))
					.then(podcast => resolve(toCamelCase(podcast)))
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
					.then(response => handleApiResponse(response))
					.then(podcast => resolve(toCamelCase(podcast)))
					.catch(err => reject(err));
			}
		});
	}
}

module.exports = new PublicApi();
