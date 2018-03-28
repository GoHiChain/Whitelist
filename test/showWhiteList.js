

/* -----------------------------
Gohichain 

gohichain@gmail.com
github@gohichain.com
----------------------------- */

var WL = artifacts.require("./WhiteList.sol");


contract('WhiteList', function(accounts) {
    let instance
    var owner = accounts[0];
    var donor = accounts[1];

    beforeEach('Show the full Whitelist', async function () {
        instance = await WL.deployed() 
    })

    it("Checking any known address to be whitelisted", function() {
    	return WL.deployed().then(function(instance) {
		accounts.forEach(function(id) {
      			instance.listed.call(id).then(function(result) {
     				console.log("Is the address " + id + " whitelisted ? " + result );
   			});
    		});
    	});
    });
});

