import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

describe("DrivingRouteCalculator", function () {

    let drivingRouteCalculator: any;
    
    let owner: SignerWithAddress;
    let otherAccount: SignerWithAddress;

    beforeEach(async () => {
        [owner, otherAccount] = await ethers.getSigners();
    
        const DrivingRouteCalculator = await ethers.getContractFactory("DrivingRouteCalculator");
    
        drivingRouteCalculator = await DrivingRouteCalculator.deploy();
    })

    describe("hello", function () {
        
        it("returns 42", async function () {
            expect(await drivingRouteCalculator.hello()).to.equal(42);
        });

    });
    
    describe("inputDistance", function () {
        
        it("correctly stores the distance between cities", async function () {

            await drivingRouteCalculator.inputDistance("EHT","NYC",2);
            
            expect(await drivingRouteCalculator.uniqueCities(0)).to.equal('EHT');
            expect(await drivingRouteCalculator.uniqueCities(1)).to.equal('NYC');
            
            expect(await drivingRouteCalculator.drivingDistances("EHT", "NYC")).to.equal(2);
            expect(await drivingRouteCalculator.drivingDistances("NYC", "EHT")).to.equal(2);

        });
        
        it("correctly stores the distance between three cities", async function () {

            await drivingRouteCalculator.inputDistance("EHT","NYC",2);
            await drivingRouteCalculator.inputDistance("EHT","AUST",25);
            await drivingRouteCalculator.inputDistance("NYC","AUST",26);
            
            expect(await drivingRouteCalculator.uniqueCities(0)).to.equal('EHT');
            expect(await drivingRouteCalculator.uniqueCities(1)).to.equal('NYC');
            expect(await drivingRouteCalculator.uniqueCities(2)).to.equal('AUST');
            
            expect(await drivingRouteCalculator.drivingDistances("EHT", "NYC")).to.equal(2);
            expect(await drivingRouteCalculator.drivingDistances("NYC", "EHT")).to.equal(2);
            
            expect(await drivingRouteCalculator.drivingDistances("EHT", "AUST")).to.equal(25);
            expect(await drivingRouteCalculator.drivingDistances("AUST", "EHT")).to.equal(25);

            expect(await drivingRouteCalculator.drivingDistances("AUST", "NYC")).to.equal(26);
            expect(await drivingRouteCalculator.drivingDistances("NYC", "AUST")).to.equal(26);

        });

    });

    describe("findOptimalRoute", function () {
        
        it("returns route from EHT to EHT", async function () {

            const result = await drivingRouteCalculator.callStatic.findOptimalRoute('', '', 0);
            
            expect(result).to.deep.equal(["EHT,EHT", 0]);
        });
        
        it("returns route from EHT to NYC", async function () {
            
            await drivingRouteCalculator.inputDistance("EHT","NYC",2);
            
            const result = await drivingRouteCalculator.callStatic.findOptimalRoute('', '', 0);

            expect(result).to.deep.equal(["EHT,NYC,EHT", 4]);
        });
        
        it("returns route from EHT to NYC to Aust", async function () {
            
            await drivingRouteCalculator.inputDistance("EHT","NYC",2);
            await drivingRouteCalculator.inputDistance("EHT","AUST",25);
            await drivingRouteCalculator.inputDistance("AUST","NYC",26);
            
            const result = await drivingRouteCalculator.callStatic.findOptimalRoute('', '', 0);
    
            console.log({ result })

            expect(result).to.deep.equal(["EHT,AUST,NYC,EHT", 53]);
        });

    });

});
