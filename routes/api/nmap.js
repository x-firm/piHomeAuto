var sys = require('sys');
var exec = require('child_process').exec;
var child;
//Fetch from config file not implemented yet.
var subnet = '13.37.1.0/24';
//Now shows name if lookup is possible and mac / ip-address.
var findActiveHosts = function(callback) {
	var str = "sudo nmap --system-dns -sn " + subnet + " | sed '2d' | head -n -1 | sed '/Host is up/d'"
	child = exec(str, function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
	    }
		else {
			var devices = [];
			var mac = [];
			var tmpArr = stdout.split("\n");
			for (x in tmpArr) {
				if(tmpArr[x].indexOf('Nmap') !== -1) {
					tmpArr[x] = tmpArr[x].substring(21);
					if(tmpArr[x].indexOf('(') === -1) {
						tmpArr[x] = 'unknown ' + tmpArr[x];
					}
					tmpArr[x] = tmpArr[x].replace("(","");
					tmpArr[x] = tmpArr[x].replace(")","");
					var tmpSplit = tmpArr[x].split(" ");
					var tmpJson = {
						"name":	tmpSplit[0],
				        "ip": tmpSplit[1],
					}
					devices[x] = tmpJson;					
                    // If no mac in nmap output for host, fill in Unknown.
				    if(tmpArr[x++].indexOf('MAC') === -1) {
                        mac[x] = "Unknown";
                    }
				}
				if(tmpArr[x].indexOf('MAC') !== -1) {
					tmpArr[x] = tmpArr[x].substring(13);
					tmpArr[x] = tmpArr[x].replace("(","");
					tmpArr[x] = tmpArr[x].replace(")","");
					mac[x] = tmpArr[x];
				}
			}
			devices = devices.filter(function(n){return n}); //Removes all empty elements
			mac = mac.filter(function(n){return n}); //Removes all empty elements
			for (x in devices) {
				devices[x].mac = mac[x];
			}
			callback(devices);
		}
	});
}

exports.list = function(req, res) {
	findActiveHosts(function(data){
	    res.json(JSON.stringify(data)); 
	});
}
