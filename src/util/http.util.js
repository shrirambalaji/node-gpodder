const removeTrailingSlash = url => {
	if (/(\/)$/.test(url)) {
		url = url.slice(0, url.length - 1);
	}
	return url;
};

const normalizeReqParams = params => {
	normalizedParams = {};
	if (Object.keys(params).length > 0) {
		Object.keys(params).map((key, index) => {
			if (params[key]) {
				normalizedParams[key] = params[key];
			}
		});
	}

	return normalizedParams;
};

const handleApiResponse = response => {
	return new Promise(function(resolve, reject) {
		if (!/2[0-9]/.test(response.status)) {
			error = new Error(`Expected 2xx, found ${response.status}`);
			error.statusCode = response.status;
			reject(error);
		} else {
			try {
				// throws an error if body isnt valid json, catch that and resolve as text instead
				let body = JSON.stringify(response.body);
				resolve(response.json());
			} catch (error) {
				resolve(response.text());
			}
		}
	});
};

const makeQueryString = (reqParams, reqUrl) => {
	if (!reqParams) {
		error = new Error("Missing or invalid parameters");
		return err;
	}
	reqParams = normalizeReqParams(reqParams);
	queryString = "";
	paramKeys = Object.keys(reqParams);
	paramsLen = paramKeys.length;
	if (paramsLen > 0) {
		paramKeys.map((key, index) => {
			if (reqParams[key]) {
				// append `?` to denote beginning of queryString
				if (index === 0) {
					queryString += "?";
				}
				queryString += `${key}=${reqParams[key]}`;
				nextKey = paramKeys[index + 1];
				nextElement = reqParams[`${nextKey}`];
				// append `&` if index isnt at the last element, and if next key isnt null
				if (index !== paramsLen - 1 && nextElement) {
					queryString += "&";
				}
			}
		});
	}
	if (reqUrl) {
		return `${removeTrailingSlash(reqUrl)}${queryString}`;
	} else {
		return queryString;
	}
};

module.exports = { handleApiResponse, makeQueryString, normalizeReqParams, removeTrailingSlash };
