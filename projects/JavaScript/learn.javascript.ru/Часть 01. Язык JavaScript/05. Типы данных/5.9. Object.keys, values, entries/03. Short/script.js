/*2025.08.11 18:21 IMM*/
'use strict';

// Given an array nums of size n, return the majority element.

// The majority element is the element that appears more than ⌊n / 2⌋ times. 
// You may assume that the majority element always exists in the array.

// Example 1:

// Input: nums = [3,2,3]
// Output: 3
// Example 2:

// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

let nums = [3,2,3];

var majorityElement = function(nums) {
    const freqMap = {};

    for(let num of nums){
      freqMap[num] = (freqMap[num]||0) + 1;
    }
    
    let max=0;
    for(let value of Object.values(freqMap))
      if(value>max) max=value;

    return +Object.keys(freqMap).find(key=>freqMap[key]===max);
};

console.log(majorityElement(nums));