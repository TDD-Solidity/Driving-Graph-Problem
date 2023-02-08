// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract DrivingRouteCalculator {
    constructor() {
        console.log("Created!");

        foundCities["EHT"] = true;
    }

    mapping(string => mapping(string => uint256)) public drivingDistances;

    mapping(string => bool) foundCities;

    uint256 nextUniqueCityIndex = 1;

    string[] public uniqueCities = ["EHT"];

    function hello() public pure returns (uint256) {
        return 42;
    }

    function addToUniqueCities(string memory city) internal {
        if (!foundCities[city]) {
            foundCities[city] = true;
            uniqueCities.push(city);
            nextUniqueCityIndex++;
        }
    }

    function inputDistance(
        string memory city1,
        string memory city2,
        uint256 distance
    ) public {
        drivingDistances[city1][city2] = distance;
        drivingDistances[city2][city1] = distance;

        addToUniqueCities(city1);
        addToUniqueCities(city2);
    }

    function findOptimalRoute(
        string memory currentRoute,
        string memory previousCity,
        uint256 currentDistance
    ) public returns (string memory, uint256) {
        string memory lastCity = uniqueCities[nextUniqueCityIndex - 1];

        uniqueCities.pop();
        nextUniqueCityIndex--;

        uint256 distanceFromPreviousCity;

        if (keccak256(abi.encodePacked(previousCity)) == keccak256("")) {
            currentRoute = "EHT";
            distanceFromPreviousCity = 0;
        }

        if (keccak256(abi.encodePacked(lastCity)) == keccak256("EHT")) {
            distanceFromPreviousCity = drivingDistances[lastCity][previousCity];

            // TODO - decide if the MOST optimal route.

            return (
                string.concat(currentRoute, ",", "EHT"),
                currentDistance + distanceFromPreviousCity
            );
        } else {
            if (bytes(previousCity).length == 0) {
                distanceFromPreviousCity = drivingDistances["EHT"][lastCity];
            } else {
                distanceFromPreviousCity = drivingDistances[previousCity][
                    lastCity
                ];
            }

            return
                findOptimalRoute(
                    string.concat(currentRoute, ",", lastCity),
                    lastCity,
                    currentDistance + distanceFromPreviousCity
                );
        }

        revert("it shouldn't get down to here...");
    }
}
