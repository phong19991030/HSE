@echo off
if "%1" == "" goto HELP
jar xf %1 META-INF/MANIFEST.MF
TYPE META-INF\MANIFEST.MF
DEL META-INF\MANIFEST.MF
RMDIR META-INF\
goto QUIT

:HELP
echo ERROR: Missing JAR OR WAR file name
echo Usage: check_version.sh $war or jar filename
:QUIT