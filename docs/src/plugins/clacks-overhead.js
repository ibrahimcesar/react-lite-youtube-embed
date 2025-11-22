/**
 * GNU Terry Pratchett
 *
 * A man is not dead while his name is still spoken.
 *
 * This plugin adds the X-Clacks-Overhead header as a tribute to Sir Terry Pratchett.
 * Read more: http://www.gnuterrypratchett.com/
 */

module.exports = function (context, options) {
  return {
    name: 'clacks-overhead-plugin',

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'meta',
            attributes: {
              'http-equiv': 'X-Clacks-Overhead',
              content: 'GNU Terry Pratchett',
            },
          },
        ],
      };
    },
  };
};
