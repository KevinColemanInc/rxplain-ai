.ONESHELL:

CONDA_ACTIVATE = source $$(conda info --base)/etc/profile.d/conda.sh ; conda activate ; conda activate

help:
	@grep -E '^[a-zA-Z_0-9]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


install:
	conda env create -f rxplain_env.yml
	echo 'remember to run'
	echo '$ conda activate rxplain'

dev: 
	fastapi dev main.py

clean:
	conda remove --name rxplain --all

exportdocs:
	python export.py

export_conda:
	conda env export | grep -v "^prefix: " > rxplain_env.yml