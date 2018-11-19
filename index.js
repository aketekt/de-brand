#!/usr/bin/env node

"use strict";
const fs = require('fs');
const json2csv = require('json2csv').parse;
const csv2json = require ('csvtojson');
const csvFilePath = 'file.csv'
const chalk = require('chalk');

let fields = ['Keyword', 'Brand'];
let data;

function runScript(path, callback, writeFile) {
    csv2json()
        .fromFile(path)
        .then((jsonObj)=>{
        data = jsonObj;

        console.log(chalk.green("Data has been imported..."));
        
        callback(writeFile); 
    });    
};

function processData(callback) {
    data.forEach(element => {
        element.Brand = (element.Keyword.match(/^(paul|guy|brand3|etc...|)$/i)) ? "yes" : "no";
    });
    callback();
};
    
function writeFile() {
    console.log(chalk.yellow("parsing data and saving...This may take a while..."));
    const csv = json2csv(data, fields);
    fs.writeFile("newFile.csv", csv, function(err) {
        if (err) {console.log(err);} 
        else {console.log(chalk.green("File saved"));
        }
    })
};

runScript(csvFilePath, processData, writeFile);