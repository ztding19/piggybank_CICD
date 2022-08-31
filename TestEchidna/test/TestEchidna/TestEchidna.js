const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

describe('[TokenTest] ERC20', function () {
    let deployer;
    const _name = 'AliceToken';
    const _symbol = 'ACE';

    before(async function () {
        [deployer] = await ethers.getSigners();
        const AliceTokenFactory = await ethers.getContractFactory('AliceToken', deployer);
        this.token = await AliceTokenFactory.deploy();
        
    });

    it('correct name', async function () {
        
        expect(
            await this.token.name()
        ).to.equal(_name);
        console.log(_name);
        

    });
    it('correct symbol', async function () {
        /** CODE YOUR EXPLOIT HERE */
        expect(
            await this.token.symbol()
        ).to.equal(_symbol);
        console.log(_symbol);

    });

    after(async function () {
        
    });
});