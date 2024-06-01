help:
	@grep -E '^[a-zA-Z_0-9]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


install:
	conda env create -f rxplain_env.yml
	conda activate rxplain

dev: 
	fastapi dev main.py

exportdocs:
	python export.py