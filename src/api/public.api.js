/**
 * Public API that does not require user-level authentication.
 * Search Podcasts
 * Get Top Tags
 * Get Podcast Metadata
 * Get Episode Data
 */
"use strict";
const path = require("path");
const fetch = require("node-fetch");
const Promise = require("bluebird");
const { error, success, debug, httpUtil } = require("util-box");
const HOMEDIR = path.join(__dirname, "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const Locator = require(path.join(SRCDIR, "util", "locator.util"));
const apiConfiguration = require(path.join(HOMEDIR, "config", "api.config"));
const CONSTANTS = apiConfiguration.constants;

class PublicApi {
	constructor() {
		const locator = new Locator();
		this._locator = locator;
	}
	/**
	 * Get a list of most-subscribed podcasts of a Tag
	 * @param {number} count - (optional) number of podcasts returned. Default = 50. Range = 1 (minimum) to 100 (maximum)
	 * @returns {array} - an array of podcast objects
	 */
	getTopList(count = CONSTANTS.TOPLIST_DEFAULT) {
		return new Promise((resolve, reject) => {
			fetch(this._locator.toplistUri(count, CONSTANTS.FORMAT_DEFAULT))
				.then(response => httpUtil.handleApiResponse(response))
				.then(podcastArray => resolve(podcastArray))
				.catch(err => reject(err));
		});
	}

	/**
	 * Search for podcasts on the webservice
	 * @param {string} query - podcast search query
	 * @returns {array} - an array of podcast objects
	 */
	searchPodcasts(query) {
		return new Promise((resolve, reject) => {
			if (!query) {
				reject(new Error("Missing or invalid parameters: query"));
			} else {
				fetch(this._locator.searchUri(query, CONSTANTS.FORMAT_DEFAULT))
					.then(response => httpUtil.handleApiResponse(response))
					.then(podcastArray => resolve(podcastArray))
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
					.then(podcastArray => resolve(podcastArray))
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
				fetch(this._locator.getPodcastData(podcastUri))
					.then(response => httpUtil.handleApiResponse(response))
					.then(podcast => resolve(podcast))
					.catch(err => reject(err));
			}
		});
	}

	getEpisodeData(podcastUri, episodeUri) {
		return new Promise((resolve, reject) => {
			if (!podcastUri || !episodeUri) {
				reject("Missing or invalid parameters: podcastUri, episodeUri");
			} else {
				fetch(this._locator.getEpisodeData(podcastUri, episodeUri))
					.then(response => httpUtil.handleApiResponse(response))
					.then(podcast => resolve(podcast))
					.catch(err => reject(err));
			}
		});
	}
}

module.exports = PublicApi;
