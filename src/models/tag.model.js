/**
 * Container class for a tag in the top tag lis
 */

class Tag {
	REQUIRED_FIELDS = ["tag", "usage"];

	/**
	 *
	 * @param {string} tag -  name of the tag
	 * @param {string} usage - usage of the tag
	 */
	constructor(tag, usage) {
		this.tag = tag;
		this.usage = usage;
	}

	static getRequiredFields = function() {
		return REQUIRED_FIELDS;
	};
}
