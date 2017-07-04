#!/bash/bin

touch annotations.txt

read -p '>>> Name: ' local name
read -p '>>> Git URL: ' local url
read -p '>>> Author: ' local author
read -p '>>> Type: ' local type
read -p '>>> Description: ' local desc

read -p ">>> Does this look right? (Y/n)" resp

if [ "$resp" == "Y" ]
then
	echo "{
		\"name\": \"$name\",
		\"git\": \"$url\",
		\"author\": \"$author\",
		\"type\": \"$type\",
		\"description\": \"$desc\"
	}" > manifest.json
elif [ "$resp" == "N" ]
then
	prompt
else
	echo "
	{
		\"name\": \"$name\",
		\"git\": \"$url\",
		\"author\": \"$author\",
		\"type\": \"$type\",
		\"description\": \"$desc\"
	}
	" > manifest.json
fi
}

prompt

cd css
sass --watch main.scss:main.css --style compressed
