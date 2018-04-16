#!/bin/bash

function createRequireModule() {
    echo Module Name\:;
    repl=`read imp; echo ${imp//[^a-z\-]}`
    path="app/js/";
    filecontent=`cat ${path}testmod.js`;
    targetfile="`pwd`/$path$repl.js";
    echo ${filecontent/testmod/$repl} > $targetfile;
    code $targetfile;
    echo "Please add created file $repl.js to gulp 'js' Task, to provide it for the distributed code"
}
