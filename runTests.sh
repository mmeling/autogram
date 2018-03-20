#!/bin/bash

HOME_DIR=`pwd`
WDIO_BIN_PATH=${HOME_DIR}/node_modules/webdriverio/bin
WDIO_BIN=wdio

COMMAND_OPTIONS=""
COMMAND=${WDIO_BIN_PATH}/${WDIO_BIN}


getopt --test > /dev/null
if [[ $? -ne 4 ]]; then
    echo "You need to install `getopt` on this environment."
    echo "MAC OS: `brew install gnu-getopt` and then `brew link --force gnu-getopt`"
    echo "WINDOWS: Who Uses Windows? You will need to google how to install getopt.."
    exit 1
fi

OPTIONS=c:w:s:S:i:h:
LONGOPTIONS=config:,watch:,spec:,suite:,instances:,host:

# -temporarily store output to be able to check for errors
# -activate advanced mode getopt quoting e.g. via “--options”
# -pass arguments only via   -- "$@"   to separate them correctly
PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTIONS --name "$0" -- "$@")
if [[ $? -ne 0 ]]; then
    # e.g. $? == 1
    #  then getopt has complained about wrong arguments to stdout
    exit 2
fi
# use eval with "$PARSED" to properly handle the quoting
eval set -- "$PARSED"

# now enjoy the options in order and nicely split until we see --
while true ; do
    case "$1" in
        -c|--config)
            case "$2" in
                "") shift 2 ;;
                *) CONFIG_TO_FIND=$2 ; shift 2 ;;
            esac ;;
        -w|--watch)
        case "$2" in
                "") shift 2 ;;
                *) WATCH_SPECS=$2 ; shift 2 ;;
            esac ;;
        -s|--spec)
            case "$2" in
                "") shift 2 ;;
                *) SPEC_TO_FIND=$2 ; shift 2 ;;
            esac ;;
        -S|--suite)
            case "$2" in
                "") shift 2 ;;
                *) SUITE_NAME=$2 ; shift 2 ;;
            esac ;;
        -i|--instances)
            case "$2" in
                "") shift 2 ;;
                *) NUMBER_OF_INSTANCES=$2 ; shift 2 ;;
            esac ;;
        -h|--host)
        case "$2" in
                "") shift 2 ;;
                *) HOST_NAME=$2 ; shift 2 ;;
            esac ;;
        --)
            shift
            break
            ;;
        *)
            echo "Internal error!"
            exit 1
            ;;
    esac
done


function usage() {
	echo "-------------------------------------------------------------------------"
	echo "-	 -c <configFile>						-"
	echo "-	 -s <specFile>							-"
	echo "-	 -S <suiteName>							-"
	echo "-	 -i <instances>							-"
	echo "-	 -h <hostname>							-"
	echo "-	 -s and -S FLAGS CAN NOT BE USED TOGETHER			-"
	echo "-	USAGE: $0 -c wdio.conf.js -s image.library.spec.js	-"
	echo "-									-"
	echo "-				OR					-"
	echo "-									-"
	echo "-	USAGE: $0 -c wdio.conf.js -S pushaudit		-"
	echo "-------------------------------------------------------------------------"
}

function removeExistingCSVFile() {
    CSV_FILE_PATH=${HOME_DIR}/junitReports/
    CSV_FILE_NAME=testListResults.csv
    CSV_FILE=${CSV_FILE_PATH}${CSV_FILE_NAME}

    if [[ -n $CSV_FILE ]]; then
        sudo rm -rf ${CSV_FILE}
    fi
}

function findConfigFile() {
	echo "Searching for config file '${CONFIG_TO_FIND}' in '${HOME_DIR}'..."
	export CONFIG_FILE=$(find ${HOME_DIR} -name ${CONFIG_TO_FIND})
	if [[ -n $CONFIG_FILE ]]; then
		echo "Found config file '${CONFIG_TO_FIND}' in '${HOME_DIR}'"
		echo ""
    else
    	echo "Failed to find config file '${CONFIG_TO_FIND}' in '${HOME_DIR}'"
    	exit 0;
    fi
}

function enableWatchingOfSpecFileChanges() {
    WATCH_OPTIONS="--watch"
}

function findSpecFile() {
	echo "Searching for spec file '${SPEC_TO_FIND}' in '${HOME_DIR}'..."
	SPEC_FILE=$(find ${HOME_DIR} -name ${SPEC_TO_FIND})
	if [[ -n $SPEC_FILE ]]; then
		echo "Found spec file '${SPEC_TO_FIND}' in '${HOME_DIR}'"
		echo ""
		SPEC_OPTIONS="--spec ${SPEC_FILE}"
    else
    	echo "Failed to find spec file '${SPEC_TO_FIND}' in '${HOME_DIR}'"
    	exit 0;
    fi
}

function setSuiteName() {
	SUITE_OPTIONS="--suite ${SUITE_NAME}"
}

## The number of tests to run in parallel
function updateMaxInstances() {
        echo "Updating the number of instances to ${NUMBER_OF_INSTANCES} in ${CONFIG_FILE}"
	sed -i "s/maxInstances:.*/maxInstances: ${NUMBER_OF_INSTANCES},/g" ${CONFIG_FILE}
}
function updateBaseUrl() {
    echo "Updating base url to ${HOST_NAME}"
    #Check if the host is staging, if so, point to https
    if [[ ${HOST_NAME} == *"staging"* ]];then
        sed -i "s/baseUrl:.*/baseUrl: 'https:\/\/${HOST_NAME}',/g" ${CONFIG_FILE}
    else
        sed -i "s/baseUrl:.*/baseUrl: 'http:\/\/${HOST_NAME}',/g" ${CONFIG_FILE}
    fi
}

function checkOptionsAndRun() {
    if [[ ! -z $SPEC_TO_FIND ]] && [[ ! -z $SUITE_NAME ]]; then
    	echo "CAN NOT USE spec and suite at the same time, choose one or the other."
    	exit 0;
    fi
    if [[ ! -z $CONFIG_TO_FIND ]]; then
    	findConfigFile
    	COMMAND_OPTIONS=${CONFIG_FILE}
    fi
    if [[ ! -z $WATCH_SPECS ]]; then
        enableWatchingOfSpecFileChanges
        COMMAND_OPTIONS="${COMMAND_OPTIONS} ${WATCH_SPECS}"
    fi
    if [[ ! -z $SPEC_TO_FIND ]]; then
    	findSpecFile
    	COMMAND_OPTIONS="${COMMAND_OPTIONS} ${SPEC_OPTIONS}"
    fi
    if [[ ! -z $SUITE_NAME ]]; then
    	setSuiteName
    	COMMAND_OPTIONS="${COMMAND_OPTIONS} ${SUITE_OPTIONS}"
    fi
    if [[ ! -z $NUMBER_OF_INSTANCES ]]; then
	   updateMaxInstances
    fi
    if [[ ! -z $HOST_NAME ]]; then
        updateBaseUrl
    fi
    if [[ -n ${COMMAND_OPTIONS} ]]; then
	echo "COMMAND: ${COMMAND} ${COMMAND_OPTIONS}"
        removeExistingCSVFile
    	sudo ${COMMAND} ${COMMAND_OPTIONS}
    else
    	usage
    	exit 0;
    fi
}

checkOptionsAndRun
