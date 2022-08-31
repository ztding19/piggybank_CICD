//PiggyBank unit test
const { ethers} = require('hardhat');
const { expect } = require('chai');

describe('[Test_transfer]', function () {

    let deployer;
    let hacker;
    const ETHER_IN_PIG = ethers.utils.parseEther('1000');
    const ETHER_To_PIG = ethers.utils.parseEther('100');

    before(async function () {
        //ETHER_IN_PIG = goal
        [deployer] = await ethers.getSigners();
        const PigFactory = await ethers.getContractFactory('PiggyBank', deployer);
        this.pig = await PigFactory.deploy(ETHER_IN_PIG);   //this.pig就是contract       

        //await deployer.sendTransaction({ to: this.pig.address, value: ETHER_To_PIG });
        //expect(await ethers.provider.getBalance(this.pig.address)).to.be.equal(ETHER_IN_PIG);
        
    });

    it('correct balance', async function () {

        await deployer.sendTransaction({ to: this.pig.address, value: ETHER_To_PIG });  
        expect(await ethers.provider.getBalance(this.pig.address)).to.be.equal(ETHER_To_PIG);

    });

    it('correct takeMoney', async function () {

        await deployer.sendTransaction({ to: this.pig.address, value: ETHER_To_PIG });
        // await this.pig.takeMoney(100);
        expect(await this.pig.takeMoney(100)).to.changeEtherBalance(this.pig, -100);

    });

    it('correct autoWithdraw', async function () {

        await deployer.sendTransaction({ to: this.pig.address, value: ETHER_IN_PIG });
        expect(await ethers.provider.getBalance(this.pig.address)).to.be.equal(0);
        // expect(await this.pig.address).to.be.equal(null);

    });

    // it('correct diyWithdraw', async function () {

    //     await deployer.sendTransaction({ to: this.pig.address, value: ETHER_IN_PIG });
    //     await this.pig.withdraw();
    //     expect(await ethers.provider.getBalance(this.pig.address)).to.be.equal(0);
    //     //expect(await this.pig.address).to.be.equal(null);

    // });

    // it('correct symbol', async function () {

    //     /** CODE YOUR EXPLOIT HERE */
    //     expect(
    //         await this.token.symbol()
    //     ).to.equal(_symbol);
    //     console.log(_symbol);

    // });

    after(async function () {      

    });

});
