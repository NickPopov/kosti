var norseUtils = require('norseUtils');
var userLib = require('userLib');
var cartLib = require('cartLib');
var portal = require('/lib/xp/portal');
var contentLib = require('/lib/xp/content');
var helpers = require('helpers');
var thymeleaf = require('/lib/xp/thymeleaf');
var nodeLib = require('/lib/xp/node');
var contextLib = require('/lib/contextLib');

exports.post = function( req ) {
    var params = req.params;
    var result = false;
    var view = resolve('cart.html');
    switch (params.action){
        case 'modify':
            contextLib.runAsAdmin(function () {
                result = cartLib.modify( params.cartId, params.itemId, params.amount, params.size, params.force );
            });
            break;
        case 'setOrder':
            contextLib.runAsAdmin(function () {
                result = cartLib.setOrder( params.cartId, params.orderId );
            });
            break;
        default:
            result = cartLib.getCart( req.cookies.cartId );
            break;
    }
    return {
        body: result,
        contentType: 'application/json'
    }
};
exports.get = function( req ) {
    var params = req.params;
    var result = false;
    var view = resolve('cart.html');
    var site = portal.getSiteConfig();
    var shopUrl = portal.pageUrl({
        id: site.shopLocation
    });
    return {
        body: thymeleaf.render(view, {
            cart: cartLib.getCart( req.cookies.cartId ),
            pageComponents: helpers.getPageComponents(req),
            shopUrl: shopUrl
        }),
        contentType: 'text/html'
    }
};