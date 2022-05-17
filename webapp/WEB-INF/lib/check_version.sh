#!/bin/ksh

if [ "$1" == "" ]; then
        echo "ERROR: Missing JAR OR WAR file name"
        echo "Usage: check_version.sh $war or jar filename"
        exit
fi

jar xf $1 META-INF/MANIFEST.MF
cat META-INF/MANIFEST.MF
rm META-INF/MANIFEST.MF
rm -r META-INF/