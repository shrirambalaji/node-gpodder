/**
 * Container Class for Episodes
 */

class Episode {
	REQUIRED_FIELDS = ["title", "url", "podcastTitle", "podcastUrl", "description", "website", "released", "mygpoLink"];

	constructor(title, url, podcastTitle, podcastUrl, description, website, released, mygpoLink) {
		this.title = title;
		this.url = url;
		this.podcastTitle = podcastTitle;
		this.podcastUrl = podcastUrl;
		this.description = description;
		this.website = website;
		this.released = released;
		this.mygpoLink = mygpoLink;
	}

	static getRequiredFields = function() {
		return REQUIRED_FIELDS;
	};
}

module.exports = Episode;
