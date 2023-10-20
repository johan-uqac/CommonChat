line_length=$(echo $(curl -s "https://validator.nu/?doc=https://johan-uqac.github.io/CommonChat&out=gnu") | wc -m | tail -n 1 | tr -d ' ')

if [ $line_length != 1 ]; then
    curl -s "https://validator.nu/?doc=https://johan-uqac.github.io/CommonChat&out=gnu" > ${GITHUB_WORKSPACE}/errors.txt
    echo "W3C_ERRORS=1" >> $GITHUB_ENV
else
    echo "W3C_ERRORS=0" >> $GITHUB_ENV
fi

echo $line_length