const { httpUtil } = require("util-box");
const apiConfiguration = require("../../config/api.config.js");
const DEFAULT_FORMAT = "opml";
const SIMPLE_FORMATS = ["opml", "json", "txt"];
const SETTINGS_TYPES = ["account", "device", "podcast", "episode"];

/**
 * This helper class abstracts the URIs for the gpodder.net
   webservice and provides a nice facility for generating API
   URIs and checking parameters.
 */
class Locator {
	constructor(username, host) {
		this._username = username;
		if (!host) {
			this._host = apiConfiguration.base;
		} else {
			this._host = host;
		}
	}

	/**
	 * Internally used to prefix a `root` string.
	 * @param {string} root - root string to be prefixed
	 * @param {string} prefixWith  - prefix string
	 */
	_prefixString(root, prefixWith) {
		root = root.trim();
		prefixWith = prefixWith.trim();
		return prefixWith.concat(root);
	}

	/**
	 *
	 * @param {string} format - input string to convert to
	 * This is used to normalize a dot-suffixed input format
	 */
	_normalizeFormat(format) {
		if (/^\./.test(format)) {
			format = format.substr(1);
		}
		// if format, is unsupported, return DEFAULT_FORMAT
		if (!SIMPLE_FORMATS.includes(format)) {
			return DEFAULT_FORMAT;
		}
		return format;
	}

	_normalizeHost(host) {
		if (!/http/.test(host)) {
			host = this._prefixString(host, "http://");
		}
		return host.trim();
	}

	/**
	 *
	 * @param {string} query  - input query to encode
	 * This is used to return a url-encoded query strign
	 */
	_urlEncodeString(query) {
		return encodeURIComponent(query);
	}

	/**
	 * Converts since into a numeric value
	 * @param {string} since
	 * @returns {number}
	 */
	_normalizeSince(since) {
		if (since) {
			return parseInt(since);
		}
		return null;
	}
	/**
	 *  This is used to fetch the base uri of gpodder.net web service from api configuration
	 * @param {string} endpoint  - the gpodder endpoint
	 * @param {boolean} is_advanced - whether or not to fetch Advanced Api Client Endpoints
	 */
	_getBaseUri(endpoint, is_advanced = false) {
		let base = this._normalizeHost(this._host);
		let versionString = `/api/${apiConfiguration.version}`;
		if (endpoint) {
			let apiEndpoint = `${apiConfiguration.endpoints[endpoint]}`;
			if (is_advanced) {
				apiEndpoint = this._prefixString(apiEndpoint, versionString);
			}
			apiEndpoint = this._prefixString(apiEndpoint, base);
			return apiEndpoint;
		} else return base;
	}

	/**
	 * Get the Simple API URI for a subscription list
	 * @param {string} deviceId - ( optional ) unique device identifier
	 * @param {string} format - valid output format
	 * @returns {object} - returns device subscriptions if deviceId is present, else all subscriptions are returned
	 */
	subscriptionsUri(deviceId, format) {
		// if only single parameter is provided, it represents the format
		if (deviceId && deviceId.length > 0 && !format) {
			format = deviceId;
			deviceId = null;
			// since the deviceId is null, return get subscriptions for all.
			return `${this._getBaseUri("subscriptions")}/${this._username}.${this._normalizeFormat(format)}`;
		} else {
			if (!format) format = "opml";
			return `${this._getBaseUri("subscriptions")}/${this._username}/${deviceId}.${this._normalizeFormat(format)}`;
		}
	}

	/**
	 * Get the Simple API URI for the toplist
	 * @param {number} count
	 * @param {string} format - valid output format
	 */
	toplistUri(count = 50, format = "opml") {
		return `${this._getBaseUri("toplist")}/${count}.${this._normalizeFormat(format)}`;
	}

	/**
	 * Get the Simple API URI for user suggestions
	 * @param {number} count - (optional, defaults to 10) max. number of suggestions to retrieve
	 * @param {string} format - valid output format
	 */
	suggestionsUri(count = 10, format = "opml") {
		return `${this._getBaseUri("suggestions")}/${count}.${this._normalizeFormat(format)}`;
	}

	/**
	 * Get the Simple API URI for podcast search
	 * @param {string} query - input search query
	 * @param {string} format - valid output format
	 */
	searchUri(query, format = "opml", options = {}) {
		query = this._urlEncodeString(query);
		const searchParams = {};
		searchParams.q = options.q || query;
		if (options.isJsonP) searchParams["jsonp"] = options.isJsonP;
		if (options.shouldScaleLogo) searchParams["scale_logo"] = options.shouldScaleLogo;
		return `${this._getBaseUri("search")}.${this._normalizeFormat(format)}${httpUtil.makeQueryString(searchParams)}`;
	}

	/**
	 *
	 * @param {string} deviceId - unique device identifier
	 */
	addRemoveSubscriptionsUri(deviceId) {
		return `${this._getBaseUri("subscriptions", true)}/${this._username}/${deviceId}.json`;
	}

	/**
	 * Get the Advanced API URI for downloading list
	 * @param {string} deviceId - unique device identifier
	 * @param {number} since - (optional) nth entry to subscribe from
	 */
	subscriptionUpdatesUri(deviceId, since = null) {
		since = this._normalizeSince(since);
		return `${this._getBaseUri("subscriptions", true)}/${this._username}/${deviceId}.json${httpUtil.makeQueryString({
			since: since
		})}`;
	}

	/**
	 * Get the Advanced API URI for uploading episode actions
	 */
	uploadEpisodeActionsUri() {
		return `${this._getBaseUri("episodes", true)}/${this._username}.json`;
	}

	/**
	 * Get the Advanced API URI for downloading episode actions
	 * @param {number} since - (optional) nth entry to begin downloading from
	 * @param {string} podcast - valid podcast url
	 * @param {string} deviceId - unique device identifier
	 * Both "podcast" and "deviceId" are optional and exclusive
	 */
	downloadEpisodeActionsUri(since = null, podcast = null, deviceId = null) {
		if (deviceId && podcast) {
			return new Error("Must not specify both 'podcast' and 'deviceId'");
		} else {
			since = this._normalizeSince(since);
			let opts = {
				since: since,
				podcast: podcast,
				device: deviceId
			};
			return `${this._getBaseUri("episodes", true)}/${this._username}.json${httpUtil.makeQueryString(opts)}`;
		}
	}

	/**
	 * Get the Advanced API URI for device updates
	 * @param {string} deviceId - unique device identifier
	 * @param {number} since - timestamp for last received
	 * @param {boolean} includeActions - boolean to enable/disable showing actions
	 */
	deviceUpdatesUri(deviceId, since, includeActions = false) {
		since = this._normalizeSince(since);
		const opts = { since, includeActions };
		return `${this._getBaseUri("updates", true)}/${this._username}/${deviceId}.json${httpUtil.makeQueryString(opts)}`;
	}

	/**
	 * Get the Advanced API URI for getting per-device updates
	 * @param {string} deviceId - unique device identifier
	 */
	deviceSettingsUri(deviceId) {
		return `${this._getBaseUri("devices", true)}/${this._username}/${deviceId}.json`;
	}

	/**
	 * Get the Advanced API URI for retrieving the device list
	 */
	deviceListUri() {
		return `${this._getBaseUri("devices", true)}/${this._username}.json`;
	}

	/**
	 *
	 * @param {number} count - (optional, defaults to 50) max. number of results to retrieve
	 */
	toptagsUri(count = 50) {
		return `${this._getBaseUri("tags", true)}/${count}.json`;
	}

	/**
	 * Get the Advanced API URI for retrieving the top Podcasts of a Tag
	 * @param {string} tag - a valid tag
	 * @param {number} count - (optional, defaults to 50) max. number of results to retrieve
	 */
	podcastsOfATagUri(tag, count = 50) {
		return `${this._getBaseUri("tag", true)}/${tag}/${count}.json`;
	}

	/**
	 * Get the Advanced API URI for retrieving Podcast Data
	 * @param {string} podcast - a valid podcast url
	 */
	podcastDataUri(podcast) {
		let opts = {
			url: podcast
		};
		return `${this._getBaseUri("data", true)}/podcast.json${httpUtil.makeQueryString(opts)}`;
	}

	/**
	 * Get the Advanced API URI for retrieving Episode Data
	 * @param {string} podcast - a valid podcast url
	 * @param {string} episode - a valid episode url
	 */
	episodeDataUri(podcast, episode) {
		let opts = {
			podcast: podcast,
			url: episode
		};
		return `${this._getBaseUri("data", true)}/episode.json${httpUtil.makeQueryString(opts)}`;
	}

	/**
	 * Get the Advanced API URI for listing favorite episodes
	 */
	favoriteEpisodesUri() {
		return `${this._getBaseUri("favorites", true)}/${this._username}.json`;
	}

	/**
	 * Get the Advanced API URI for retrieving or saving Settings
	 * @param {string} type - the type of setting to get.
	 * @param {Array} params - input parameters that differ based on each setting type.
	 */
	settingsUri(type, ...params) {
		if (!SETTINGS_TYPES.includes(type)) return new Error("Unsupported Setting Type");
		else {
			let settingsUri = `${this._getBaseUri("settings", true)}/${this._username}/${type}.json`;
			switch (type) {
				case "account":
					return settingsUri;
					break;

				case "device":
					let deviceName = params[0];
					if (!deviceName) return new Error("Device Name is not specified");
					else
						return `${settingsUri}${httpUtil.makeQueryString({
							device: deviceName
						})}`;
					break;

				case "podcast":
					let podcastUrl = params[0];
					if (!podcastUrl) return new Error("Podcast Url is not specified");
					else
						return `${settingsUri}${httpUtil.makeQueryString({
							podcast: podcastUrl
						})}`;
					break;

				case "episode":
					let podcast = params[0];
					let episode = params[1];
					if (!podcast || !episode) return new Error("Podcast or Episode Url is not specified");
					else
						return `${settingsUri}${httpUtil.makeQueryString({
							podcast: podcast,
							episode: episode
						})}`;
					break;
			}
		}
	}

	postLogin() {
		return `${this._getBaseUri("auth", true)}/login.json`;
	}

	postLogout() {
		return `${this._getBaseUri("auth", true)}/logout.json`;
	}

	/**
	 *  Get the server's root URI.
	 */
	rootUri() {
		return `${this._getBaseUri()}`;
	}
}

module.exports = Locator;
