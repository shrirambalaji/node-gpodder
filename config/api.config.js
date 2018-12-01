module.exports = {
	base: "https://gpodder.net",
	endpoints: {
		subscriptions: "/subscriptions",
		toplist: "/toplist",
		suggestions: "/suggestions",
		search: "/search",
		devices: "/devices",
		tag: "/tag",
		tags: "/tags",
		data: "/data",
		favorites: "/favorites",
		settings: "/settings",
		episodes: "/episodes"
	},
	constants: {
		TOPLIST_DEFAULT: 50,
		DEFAULT_COUNT: 10,
		FORMAT_DEFAULT: "json",
		USER_AGENT: "node-gpodder"
	},
	version: "2"
};
