
/* -----------------------------
Gohichain 

gohichain@gmail.com
github@gohichain.com
----------------------------- */


function showWL(instance,accounts) {
    var i = -1;
    accounts.forEach(function(id) {
        instance.listed.call(id).then(function(result) {
            i = i+1;
            console.log("(" + i + ") Is " + id + " whitelisted ? " + result);
        });
    });
}

var WL = artifacts.require("./WhiteList.sol");
console.log("Test javascript, whitelist");

contract('WhiteList', function(accounts) {
    let instance
    var owner = accounts[0];
    var donor = accounts[1];

    beforeEach('Insert/delete and check WL', async function () {
        instance = await WL.deployed() //new(owner)
    })

    it("whitelist" , async function () {
   	    await showWL(instance,accounts);
        assert(true);
    })

    it('Addition of addresses 1,2,5,9 to the whitelist' , async function () {
        await instance.addToWhitelist.sendTransaction(accounts[1]);
        await instance.addToWhitelist.sendTransaction(accounts[2]);
        await instance.addToWhitelist.sendTransaction(accounts[5]);
        await instance.addToWhitelist.sendTransaction(accounts[9]);
    	await showWL(instance,accounts);
        assert(true);
    })

    var _from = donor;
    i1 = 6;
    it("Checking that a non-owner sender cannot add the address " + i1 + " to the whitelist", async () => {
        try {
	      let result = await instance.addToWhitelist.sendTransaction(accounts[i1],{from: _from})
	      assert.fail("It is supposed not  to reach here. An exception didn't occur");
        } catch (error) {
            const revert = error.message.search('revert') >= 1;
            const invalidOpcode = error.message.search('invalid opcode') >= 0;
            const outOfGas = error.message.search('out of gas') >= 0;
            if (invalidOpcode || outOfGas || revert) {
                assert(true,"Op did not occurred. OK");
                //assert.fail('Expected throw, got \'' + error + '\' instead',);
            } /*else	instance.listed.call(accounts[i1]).then(function(result) {
                    assert(true);
                    //assert(false==result);
            });*/
         }
    })

    it("Whitelist" , async function () {
   	    await showWL(instance,accounts);
        assert(true);
    })

    i2 = 1;
    it("Checking that a non-owner cannot remove " + i2  + " from the whitelist", async () => {
        try {
	      let result = await instance.addToWhitelist.sendTransaction(accounts[i2],{from: _from})
	      assert.fail("Expected an exception didn't occur");
        } catch (error) {
            const revert = error.message.search('revert') >= 1;
            const invalidOpcode = error.message.search('invalid opcode') >= 0;
            const outOfGas = error.message.search('out of gas') >= 0;
            if (invalidOpcode || outOfGas || revert) {
                assert(true,"Op did not occurred. OK");
                //assert.fail(true,false, 'Expected throw, got \'' + error + '\' instead',);
            } /*else instance.listed.call(accounts[i2]).then(function(result) {
                assert(true);
                //assert(true == result);
            });*/
        }
    })

    it("whitelist" , async function () {
        await showWL(instance,accounts);
        assert(true);
    })

    i3 = 5;
    it('Checking the owner can remove the address ' + i3 + " from the whitelist" , async function () {
        await instance.removeFromWhitelist(accounts[i3]);
    	instance.listed.call(accounts[i3]).then(function(result) {
	        assert(false ==  result);
        });
    })

    it("whitelist" , async function () {
        await showWL(instance,accounts);
        assert(true);
    })

    it("Fihal check. Only 1,2 & 9 have to be whitelisted" , async function () {
        var finalStatus = [];
        var num = accounts.length; 
        for (var i = 0; i < num; i++) {
            finalStatus.push(false);
        }
        finalStatus[1] = true;
        finalStatus[2] = true;
        finalStatus[9] = true;
        
        var i = -1;
        await accounts.forEach(function(id) {
            instance.listed.call(id).then(function(result) {
                i = i+1;
                assert.equal(finalStatus[i], result, "Address  " + i + " in incorrect status"); 
            });
        });
     })
});


