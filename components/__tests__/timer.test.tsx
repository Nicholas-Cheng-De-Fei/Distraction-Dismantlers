import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {createArray} from '../Timer';
import Timer from '../Timer';

describe('Timer external function', () => {

  const hourArrResult = [0,1,2,3,4,5,6,7,8,9,10]
  const minArrResult = [0,5,10,15,20,25,30,35,40,45,50];

  test('Check if the function creates the array of possible hours correctly given a limit', () => {
    expect(createArray(10, "Hour")).toStrictEqual(hourArrResult);
  });

  test('Check if the function creates the array of possible minutes correctly given a limit', () => {
    expect(createArray(50, "Minute")).toStrictEqual(minArrResult);
  });

});

describe('Timer rendering tests', () => {
  test ("Check if timer renders correctly", () => {
      const timerPage = render(<Timer />);
      const startButtonComponent = timerPage.getByTestId("Start Button");
      expect(startButtonComponent).toBeDefined();
  });
});

