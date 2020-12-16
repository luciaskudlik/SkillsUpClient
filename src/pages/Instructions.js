import React from "react";

function Instructions() {
  return (
    <div id="instructions-page">
      <div id="instructions-banner">
        <h1>Start learning new skills and host your own workshop!</h1>
      </div>
      <div id="instructions-container">
        <h3>Here’s all the info you need to get started:</h3>
        <ul>
          <li>
            Create an account with us to have access to all of our features and
            participate to awesome workshops!
          </li>
          <li>
            Once you’ve signed up, you automatically have 30 credits in your
            workshop wallet as a gift from us that you can use to attend any
            workshop on our platform.{" "}
          </li>
          <li>
            Search through the workshops and sign up to the ones you like!
          </li>
          <li>
            The amount of credits each workshop costs depends on how long it
            lasts. By default it’s 10 credits/hour.
          </li>
          <li>
            You can cancel your attendance at any time before the workshop and
            get your credits back.
          </li>
          <li>
            If you enjoy the workshop and wish to make a donation to your
            workshop host for their hard work, we’re sure they would appreciate
            it!
          </li>
          <li>
            In order to gain more credits you have to host your own workshop
            (which we highly encourage!)
          </li>
        </ul>

        <h3>How to Host your own workshop:</h3>
        <ul>
          <li>Click on the ‘host your own workshop’ button on your profile.</li>
          <li>
            This will drop down a form which you will need to fill with all the
            details for this workshop.
          </li>
          <li>
            For every new workshop, you will be granted twice the amount of the
            price. (If your workshop costs 30 credits, you will receive 60
            credits!)
          </li>
          <li>
            After that, just do what you need to do to prepare and host your
            workshop! Make sure to be on time!
          </li>
        </ul>

        <h3>And most importantly, HAVE FUN!</h3>
      </div>
    </div>
  );
}

export default Instructions;
