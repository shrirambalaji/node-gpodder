'use strict';
const path = require('path');
const fetch = require('node-fetch');
const outputUtil = require('util-box').outputUtil;
const httpUtil = require('util-box').httpUtil;
const Promise = require('bluebird');
const { error, success, debug } = outputUtil;
const SRCDIR = path.join(__dirname, '..', '..', 'src');
const Locator = require(path.join(SRCDIR, 'util', 'locator.util'));
const PublicApi = require("./public.api").PublicApi;
class DirectoryApi {
	getTopTags(count) {
		return new Promise((resolve, reject) => {
			return PublicApi.getTopTags(count)
			.then(response => resolve(response))
			.catch(err => reject(err))
		});
	}

	getPodcastsForTag(tag, count = null){
		return new Promise((resolve, reject) => {
			return PublicApi.getPodcastsOfATag(tag, count)
			.then(response => resolve(response))
			.catch(err => reject(err))
		});
	}

	getPodcastData(podcastUri){
		return new Promise((resolve, reject) => {
			return PublicApi.getPodcastData(podcastUri)
			.then(response => resolve(response))
			.catch(err => reject(err))
		});
	}

	getEpisodeData(podcastUri, episodeUri){
		return new Promise((resolve, reject) => {
			return PublicApi.getEpisodeData(podcastUri, episodeUri)
			.then(response => resolve(response))
			.catch(err => reject(err))
		});
	}

	getPodcastTopList(count, format){
		return new Promise((resolve, reject) => {
			return PublicApi.getTopLis(count, format)
			.then(response => resolve(response))
			.catch(err => reject(err))
		});
	}

	searchPodcast(query, isJsonP=false, shouldScaleLogo=false, format=null) {
		return new Promise((resolve, reject) => {
			return PublicApi.searchPodcast(query, format, {
				isJsonP: isJsonP,
				shouldScaleLogo: shouldScaleLogo,
			})
			.then(response => resolve(response))
			.catch(err => reject(err))
		});
	}

}

module.exports = new DirectoryApi();
