var Formatter = require('content-formatter');
var sub = require('string-sub');

var base = require('../base');

var iterateLines = base.iterateLines;

Formatter.CSS = Formatter.create(
	{
		id: 'js',
		includes: /\.js$/,
		prototype: {
			format: function(contents) {
				var instance = this;

				var logger = this.log.bind(this);

				contents = iterateLines(
					contents,
					function(item, index, collection) {
						return instance.processFile(item, index, collection, logger);
					}
				);

				return contents;
			},

			processFile: function(content, index, collection, logger) {
				var re = this._re;

				var rawContent = content;

				var context = this._getContext(rawContent, index, collection);

				context.rawContent = rawContent;

				rawContent = re.iterateRules('js', context);

				return rawContent;
			},

			_getContext: function(content, index, collection) {
				return context = {
					collection: collection,
					content: content,
					file: this.file,
					index: index,
					lineNum: index + 1
				};
			}
		}
	}
);

module.exports = Formatter.CSS;