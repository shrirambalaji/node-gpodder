/**
 * Container Class for Episodes
 */
class Episode {
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

	static getName() {
		return "Episode";
	}

	static getRequiredFields() {
		return [
			"title",
			"url",
			"podcastTitle",
			"podcastUrl",
			"description",
			"website",
			"released",
			"mygpoLink"
		];
	}
}

module.exports = Episode;
