# Custom Logic Homey App

Custom Logic is a Homey app that provides various flow action cards for mathematical calculations and working with temporary values.

## Features

Action cards (only with advanced flows)
- Calculate: Evaluate mathematical expressions with the 'calculate-float' and 'calculate-int' action cards.
- Days: Calculate number of days between 2 dates
- Random Numbers: Generate random numbers using 'generate-random-number' with defined ranges.
- Leap Year: Check for leap years with the 'check-leap-year' action card by providing the 'year' parameter.
- BMI Calculation: Calculate BMI with the 'calculate-bmi' action card using 'weight' and 'height' parameters.
- Mathematical Operations: Perform calculations with operators (+, -, *, /) using the 'calculate' action card with 'number1', 'number2', and 'text' (operator) parameters.
- Temporary Values: Store and retrieve temporary values (numbers, strings, URLs, and images) using 'temporary-number', 'temporary-string', 'temporary-url', and 'temporary-image' action cards.
- Image Display: Fetch and display images from a URL as tokens with the 'temporary-image' action card by providing the 'imageUrl' parameter.

Condition cards
- Number Greater Than: Check if one number is greater than another with the 'number_greater_than' condition card. Provide 'number' and 'number2' parameters.
- Number Less Than: Determine if one number is less than another using the 'number_less_than' condition card. Specify 'number' and 'number2' parameters.
- Text Has Value: Verify if a text contains a specific value with the 'text_has_value' condition card. Use 'text' and 'waarde' parameters.
- Text Has Exactly: Check if a text is exactly equal to a specified value using the 'text_has_exactly' condition card. Provide 'text' and 'waarde' parameters.
- Boolean Is Exactly: Determine if a boolean value is exactly equal to 'true' with the 'boolean_is_exactly' condition card. Provide the 'boolean' parameter.


## Getting Started
To use this app, you'll need to install it on your Homey device.

1. Open the Homey smartphone app.
2. Go to the 'Apps' section.
3. Search for 'Custom Logic' and click 'Install'.
4. The action cards can be used in Advanced Flows for various tasks and calculations.