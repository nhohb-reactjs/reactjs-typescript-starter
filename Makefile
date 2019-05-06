args=`arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

run-dev:
	npm start

build-staging:
	npm run build-staging

build-production:
	npm run build-production

new-component:
	node tools/CreateNewModule.js component $(args)

new-component-redux:
	node tools/CreateNewModule.js component $(args) redux

new-module:
	node tools/CreateNewModule.js module $(args)

new-module-redux:
	node tools/CreateNewModule.js module $(args) redux