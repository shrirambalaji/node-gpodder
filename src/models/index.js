const Episode = require("./episode.model");
const Podcast = require("./podcast.model");
const Tag = require("./tag.model");

module.exports = {
	Podcast,
	PodcastModel: Podcast,
	Episode,
	EpisodeModel: Episode,
	Tag,
	TagModel: Tag
};
