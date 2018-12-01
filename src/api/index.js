const SubscriptionsApi = require("./subscriptions.api");
const SuggestionsApi = require("./suggestions.api");
const FavoritesApi = require("./favorites.api");
const DeviceApi = require("./device.api");
const AuthenticationApi = require("./authentication.api");
const PublicApi = require("./public.api");

exports.subscriptions = exports.subscriptionsApi = exports.SubscriptionsApi = exports.Subscriptions = SubscriptionsApi;
exports.suggestions = exports.suggestionsApi = exports.SuggestionsApi = exports.Suggestions = SuggestionsApi;
exports.favorites = exports.favoritesApi = exports.FavoritesApi = exports.Favorites = FavoritesApi;
exports.device = exports.deviceApi = exports.DeviceApi = exports.Device = DeviceApi;
exports.authentication = exports.authenticationApi = exports.AuthenticationApi = exports.Authentication = AuthenticationApi;
exports.public = exports.Public = exports.publicApi = exports.PublicApi = PublicApi;
