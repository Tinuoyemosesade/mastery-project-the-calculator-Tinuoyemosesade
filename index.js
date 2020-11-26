/*
TODO:
    Limit number input
    Disallow . from being entered multiple times
    Clean up structure
*/

(function () {
  "use strict";

  // Shortcut to get elements
  var el = function (element) {
    if (element.charAt(0) === "#") {
      // If passed an ID...
      return document.querySelector(element); // ... returns single element
    }

    return document.querySelectorAll(element); // Otherwise, returns a nodelist
  };

  // Variables
  var viewer = el("#viewer"), // Calculator screen where result is displayed
    equals = el("#equals"), // Equal button
    theNum = "", // Current number
    oldNum = "", // First number
    resultNum, // Result
    operator; // Batman

  // When: Number is clicked. Get the current number selected
  var setNum = function () {
    if (resultNum) {
      // If a result was displayed, reset number
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
      // Otherwise, add digit to previous number (this is a string!)
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum; // Display current number
  };

  // When: Operator is clicked. Pass number to oldNum and save operator
  var moveNum = function () {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  // When: Equals is clicked. Calculate result
  var displayNum = function () {
    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // TODO: Add your code here
    switch (operator) {
      case "plus": // TODO: Check the line bellow to see how an operation is made
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum; // TODO: Add the minus operation here
        break;

      case "times":
        resultNum = oldNum * theNum; // TODO: Add the times operation here
        break;

      case "divided by": // TODO: Add the divided by operation here
        resultNum = oldNum / theNum;
        break;

      // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        // If result is not a number; set off by, eg, double-clicking operators
        resultNum = "You broke it!";
      } else {
        // If result is infinity, set off by dividing by zero
        resultNum = "Look at what you've done";
        el("#calculator").classList.add("broken"); // Break calculator
        el("#reset").classList.add("show"); // And show reset button
      }
    }

    // Display result, finally!
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Now reset oldNum & keep result
    oldNum = 0;
    theNum = resultNum;
  };

  // When: Clear button is pressed. Clear everything
  var clearAll = function () {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  /* The click events */

  // Add click event to numbers
  document.getElementById("btn_0").onclick = setNum;
  document.getElementById("btn_1").onclick = setNum;
  document.getElementById("btn_2").onclick = setNum;
  document.getElementById("btn_3").onclick = setNum;
  document.getElementById("btn_4").onclick = setNum;
  document.getElementById("btn_5").onclick = setNum;
  document.getElementById("btn_6").onclick = setNum;
  document.getElementById("btn_7").onclick = setNum;
  document.getElementById("btn_8").onclick = setNum;
  document.getElementById("btn_9").onclick = setNum;

  // Add click event to operators
  document.getElementById("op_plus").onclick = moveNum;
  document.getElementById("op_times").onclick = moveNum;
  document.getElementById("op_minus").onclick = moveNum;
  document.getElementById("op_div").onclick = moveNum;

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  el("#clear").onclick = clearAll;

  // Add click event to reset button
  el("#reset").onclick = function () {
    window.location = window.location;
  };
})();
