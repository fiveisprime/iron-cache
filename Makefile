SRC = $(wildcard **/*.js)

test: $(SRC)
	@node node_modules/.bin/jshint $^
	@NODE_ENV=test node node_modules/.bin/mocha \
	--require should \
	--reporter spec \
	spec

coverage:
	@istanbul cover node_modules/.bin/_mocha -R spec

.PHONY: coverage
