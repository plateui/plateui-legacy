.PHONY: release

release:
	@npm run build
	@cp dist/plate.css release/
	@cp dist/plate.umd.min.js release/plate.js
