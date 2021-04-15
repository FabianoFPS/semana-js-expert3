curl https://next.json-generator.com/api/json/get/NJafGjxXq

curl https://next.json-generator.com/api/json/get/NJafGjxXq | jq

curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | jq '.[] | {Nome: .name, Categoria: .category}'

curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | jq '.[] | {Nome: .name, Categoria: .category}' | xclip -sel copy

curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | jq '[.[] | {Nome: .name, Categoria: .category}]' | xclip -sel copy

curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | jq '[.[] | {Nome: .name, Categoria: .category}]' | tee myfile.json
curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | jq '[.[] | {name: .name, category: .category}]' | tee myfile.json

curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | jq '[.[] | {name: .name, category: .category}]' | tee myfile2.json

git clone https://github.com/ErickWendel/lives-aquecimento02-javascript-expert.git && \
  cd lives-aquecimento02-javascript-expert && \
   git submodule update --init --recursive

find . -name '*.js' -or -name '*.mjs'

ls | xargs wc -l

find . -name '*.js' -or -name '*.mjs' | xargs head -n 1

CWD=`pwd`

for PROJECT in `find . -name 'recorded' -type d`
do
  cd $CWD/$PROJECT
  cat ./package.json | jq .dependencies
  npm ci --silent
done
cd $CWD

find . -name 'node_modules' -type d -exec rm -rf '{}' +

rm -rf lives-aquecimento02-javascript-expert

ls | ipt | xargs cat

find . -name '*.js' -not -path '*node_modules*' | ipt | xargs cat
find . -name '*.js' -not -path '*node_modules*' | ipt -o| xargs wc -l

find . -maxdepth 1 -name '*.json' | ipt -o | xargs -I {FILE} sed -e 's/category/Categoria/' -e 's/name/Nome/' {FILE}

find . -maxdepth 1 -name '*.json' | ipt -o | xargs -I {FILE} sed -i 's/category/Categoria/;s/name/Nome/' {FILE}
