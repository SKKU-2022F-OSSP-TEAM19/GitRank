const {test,expect}=require("@jest/globals");
const express=require("express");
const app=express()

test("GitScore Test - Should be true",()=>{
    
    expect(typeof(app.get('/score/nickel'))==="Object"  ).toBe(false)
})