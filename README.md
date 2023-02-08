# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```


# Prompt

You are planning a roadtrip, and you have a list of cities to visit:

- Egg Harbor Township, NJ

- New York, NY

- Austin, TX

- Dallas, TX

- Redmond, Washington 

(city1, city2, driving distance in hours)

- EHT <-> NYC, 2 
- EHT <-> Austin, 25
- EHT <-> Dallas, 23
- EHT <-> Redmond, 42 

- NYC <-> Austin, 26
- NYC <-> Dallas, 23
- NYC <-> Redmond, 42 

- Austin <-> Dallas, 23
- Austin <-> Redmond, 33

- Dallas <-> Redmond, 31


Given the provided distances of travelable routes between cities, calculate shortest path. 

- Also / Bonus, if you skip any city then what is the shortest route.

- Must start and end in Egg Harbor Township

- return both the list of cities in order they should be visited (comma separated) AND the total number of driving hours for the trip
 