# Pre-Requisite:

1) Ensure that Node.js is installed
2) Ensure playwright is installed

# How to run:

1) In the terminal go to the correct directory of the project
2) To run use npx playwright test
3) To see the test report use npx playwright show-report
4) Cross browser testing exists, but it is really flaky. If you want to do cross browser testing you will have to uncomment the relevant parts in the playwright.config.ts file.

# Future plans:

If I had more time in the future, I would implement the following:

1) BDD cucumber framework
2) Page object model to avoid repeatability of code and make the codebase more maintainable. This would involve creating a constants file that will have all variables of the element especially since elements can change.
3) Implement API checks. Due to auth token missing which was giving me a 403 error, I was unable to initially verify that the reference matches what is being displayed. So if I had more time I would implement API checks.
4) I would do accessibility checks and implement more performance based tests.
5) Include more negative paths. Right now the code only takes one path but for better test coverage I would implement more negative paths.
6) Although cross browser test is built into playwright, the current test seems flaky on other browsers. So with more time I can investigate more of why the other browsers were failing.

# Assumptions:

One assumption I made based on the JSON file was that the user chooses to donate £10.
