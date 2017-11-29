In lieu of actually writing testing into the code (this *should* be done, I just have not had the expertise and time to do so) I will simply describe one set of tests to run.


to set up server:

- cd into quadmods/experiment directory
- run `python3 -m http.server` or your favorite lightweight local test server
- navigate in your browser to `http://localhost:8000/quadmods.html`
 

# Basic Test

This test uses `http://localhost:8000/quadmods.html`. Everything should run fine here but this is not an address we expect to use in an actual experiment. All parameters that are expected to be set in the url are randomized when absent, so conditions and other variables should change on reload.

Ensure that all slides work. The sequence here is:

1. Instructions
2. Entity Pretest
3. Relational Posttest
4. Training
5. Entity Posttest
6. Relational Posttest
7. Survey
8. Final Slide

Things to look for:

- Instructions: text is accurate and slide requires a delay
- Entity: All buttons work for selecting and deselecting. All data accurately updated after every click. Order should be randomized.
- Relational: Yes/No buttons work. Answers can be changed. All data accurately updated after every click. Next button does not appear until there is an answer for each question. Order should be randomized
- Training: Shape grid randomized. Shapes highlighted when clicked. Highlighting accurately reflects concept relationship. Only 3 (exp.num_examples_to_show) can be selected. Next button does not appear until 3 have been selected.
  + Test each condition and ensure text reflects condition.
  + Responsive: exp.shape_of_focus determined by entity test results. randomly select among shapes with worst accuracy (there are likely to be ties with just 4 questions). shapes that can be clicked (i.e. square vs rectangle vs etc.) also determined by entity test results. randomly select from questions incorrectly answered. if this is fewer than 3 then randomly select from questions accurately answered.
  + Active: shape of focus given in text but learner may select any shape in grid to learn about.
  + Baseline: Shows all examples in grid but gives no feedback.
  + Teaching: As responsive condition except shape_of_focus is determined by url (or randomly) and shapes to select is determined by pedagogical presets.
- Survey: Text is accurate and data accurately updated after clicking Next button.
- Final: data submitted to mturk

# URL test

Here, test that the url params are correctly passed to the experiment and that the experiment changes accordingly.

The URL format is `https://website.com/?shape=0&condition=0&assignmentId=123RVWYBAZW00EXAMPLE456RVWYBAZW00EXAMPLE&hitId=123RVWYBAZW00EXAMPLE&turkSubmitTo=https://www.mturk.com/&workerId=AZ3456EXAMPLE`. On your local machine using the testing server, this should look like `http://localhost:8000/quadmods.html?shape=0&condition=0&assignmentId=123RVWYBAZW00EXAMPLE456RVWYBAZW00EXAMPLE&hitId=123RVWYBAZW00EXAMPLE&turkSubmitTo=https://www.mturk.com/&workerId=AZ3456EXAMPLE`.

- Go through all values of `shape` and `condition` variables (don't worry about doing all *combinations*). Make sure the experiment accurately reflects the URL params.
- Make sure other URL params, such as those used in MTurk like assignmentID, are logged in the experimental data.

# MTurk Sandbox test
