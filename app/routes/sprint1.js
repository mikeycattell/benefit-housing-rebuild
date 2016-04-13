var express = require('express');
var router = express.Router();
var functions = require('../views/sprint1/functions/functions.js');
var validate = require('../views/sprint1/functions/validations.js');
var get_routes = require('../views/sprint1/functions/dynamic_routes.js');
var session = require('../views/sprint1/functions/session.js');

// Start Page
  router.get('/start-page', function(req, res) {
    res.render('sprint1/start-page');
  });
// end Start Page


// Details
  router.get('/details', function(req, res) {
    var options = functions.details_get_options(req),
        session = req.cookies.details;

    res.render('sprint1/details', {options: options, session:session});
  });

  router.post('/details', function(req, res) {
    var options = functions.details_get_options(req, res),
        urls = get_routes.urls(req),
        validation = validate.page(req);

    session.update(req, res);

    if ( validation.status === true ) {
      res.redirect(urls.next);
    } else {
      res.render('sprint1/details', {options: options, errors: validation.errors});
    }
  });
// end Details

// council Benefit
  router.get('/council', function(req, res) {
    var session = req.cookies.disability;
    res.render('sprint1/council', {session: session});
  });

  router.post('/council', function(req, res) {
    session.update(req, res);
    var validation = validate.page(req);
    var urls = get_routes.urls(req, res);

    if ( validation.status === true ) {
      res.redirect(urls.next);
    } else {
      res.render('sprint1/council', {session: req.body, errors: validation.errors, validate: validation});
    }
  });
// end Disability Benefit

// Details More
  router.get('/details-more', function(req, res) {
    var details = req.cookies.details,
        session = req.cookies.details_more;
    res.render('sprint1/details-more', {details: details, session: session});
  });

  router.post('/details-more', function(req, res) {
    var validation = validate.page(req);
    if ( validation.status === true ) {
      session.update(req, res);
      res.redirect('fraud-type');
    } else {
      session.update(req, res);
      var details = req.cookies.details;
      res.render('sprint1/details-more', {details: details, session: req.body, errors: validation.errors, validate: validation});
    }
  });
// end Details More


// Fraud Type
  router.get('/fraud-type', function(req, res) {
    var options = functions.fraud_type_get_options(req),
        session = req.cookies.fraud_urls;

    res.render('sprint1/fraud-type', {options: options, session: session});
  });

  router.post('/fraud-type', function(req, res) {
    var options = functions.fraud_type_get_options(req),
        selected = Object.keys(req.body).length,
        urls = get_routes.urls(req, res),
        validation = validate.page(req);

    session.update(req, res);

    if ( validation.status === true ) {
      res.redirect(urls.next);
    } else {
      res.render('sprint1/fraud-type', {options: options, session: req.body, errors: validation.errors});
    }
  });
// end Fraud Type


// Employment Details
  router.get('/employment-details', function(req, res) {
    var session = req.cookies.employment_details;
    res.render('sprint1/employment-details', {session: session});
  });

  router.post('/employment-details', function(req, res) {
    session.update(req, res);
    var urls = get_routes.urls(req, res),
        validation = validate.page(req);

    if ( validation.status === true ) {
      res.redirect(urls.next);
    } else {
      res.render('sprint1/employment-details', {session: req.body, errors: validation.errors});
    }
  });
// end Employment Details


// Partner Details
  router.get('/partner-details', function(req, res) {
    var session = req.cookies.partner_details;
    res.render('sprint1/partner-details', {session: session});
  });

  router.post('/partner-details', function(req, res) {
    session.update(req, res);
    var validation = validate.page(req);

    if ( validation.status === true ) {
      res.redirect('partner-employment');
    } else {
      res.render('sprint1/partner-details', {session: req.body, errors: validation.errors, validate: validation});
    }
  });
// end Partner Details


// Partner Employment
router.get('/partner-employment', function(req, res) {
  var session = req.cookies.partner_employment;
  res.render('sprint1/partner-employment', {session: session});
});

router.post('/partner-employment', function(req, res) {
  session.update(req, res);
  var urls = get_routes.urls(req, res);
  var validation = validate.page(req);

  if ( validation.status === true ) {
    res.redirect(urls.next);
  } else {
    res.render('sprint1/partner-employment', {session: req.body, errors: validation.errors});
  }
});
// end Partner Employment


// Disability Benefit
  router.get('/disability', function(req, res) {
    var session = req.cookies.disability;
    res.render('sprint1/disability', {session: session});
  });

  router.post('/disability', function(req, res) {
    session.update(req, res);
    var validation = validate.page(req);
    var urls = get_routes.urls(req, res);

    if ( validation.status === true ) {
      res.redirect(urls.next);
    } else {
      res.render('sprint1/disability', {session: req.body, errors: validation.errors, validate: validation});
    }
  });
// end Disability Benefit


// Carers Benefit
  router.get('/carers', function(req, res) {
    var session = req.cookies.carers;

    res.render('sprint1/carers', {session: session});
  });

  router.post('/carers', function(req, res) {
    session.update(req, res);
    var validation = validate.page(req);

    if ( validation.status === true ) {
      res.redirect('carers-more');
    } else {
      res.render('sprint1/carers', {session: req.body, errors: validation.errors, validate: validation});
    }
  });
// end Carers Benefit

// Carers More
  router.get('/carers-more', function(req, res) {
    var session = req.cookies['carers-more'];
    res.render('sprint1/carers-more', {session: session});
  });

  router.post('/carers-more', function(req, res) {
    session.update(req, res);
    var urls = get_routes.urls(req, res);
    res.redirect(urls.next);
  });
// end Carers More


// Abroad
  router.get('/abroad', function(req, res) {
    var session = req.cookies.abroad;
    res.render('sprint1/abroad', {session: session});
  });

  router.post('/abroad', function(req, res) {
    session.update(req, res);
    var urls = get_routes.urls(req, res);
    var validation = validate.page(req);

    if ( validation.status === true ) {
      res.redirect(urls.next);
    } else {
      res.render('sprint1/abroad', {session: req.body, errors: validation.errors});
    }
  });
// end Abroad


// Identity
  router.get('/identity', function(req, res) {
    var session = req.cookies.identity;
    res.render('sprint1/identity', {session: session});
  });

  router.post('/identity', function(req, res) {
    session.update(req, res);
    var urls = get_routes.urls(req, res);
    var validation = validate.page(req);

    if ( validation.status === true ) {
      res.redirect(urls.next);
    } else {
      res.render('sprint1/identity', {session: req.body, errors: validation.errors, validate: validation});
    }
  });
// end Identity


// Income
  router.get('/income', function(req, res) {
    var session = req.cookies.income;
    res.render('sprint1/income', {session: session});
  });

  router.post('/income', function(req, res) {
    session.update(req, res);
    var validation = validate.page(req);

    if ( validation.status === true ) {
      res.redirect('income-more');
    } else {
      res.render('sprint1/income', {session: req.body, errors: validation.errors, validate: validation});
    }
  });
// end Income


// Income More
  router.get('/income-more', function(req, res) {
    var session = req.cookies.income_more;
    res.render('sprint1/income-more', {session: session});
  });

  router.post('/income-more', function(req, res) {
    session.update(req, res);
    var urls = get_routes.urls(req, res);
    var validation = validate.page(req);

    if ( validation.status === true ) {
      res.redirect(urls.next);
    } else {
      res.render('sprint1/income-more', {session: req.body, errors: validation.errors, validate: validation});
    }
  });
// end Income More

// Additional Information
  router.get('/additional-information', function(req, res) {
    res.render('sprint1/additional-information', {session: session});
  });

  router.post('/additional-information', function(req, res) {
    session.update(req, res);
    res.redirect('review');
  });
// end Additional Information

// Other
  router.get('/other', function(req, res) {
    var session = req.cookies.other;
    if ( session === undefined ) {
      session = {};
    }

    if ( Object.keys(req.cookies.fraud_urls).length === 1 ) {
      session.single_fraud = true;
    } else {
      session.single_fraud = false;
    }

    res.render('sprint1/other', {session: session});
  });

  router.post('/other', function(req, res) {
    session.update(req, res);
    var validation = validate.page(req);

    if ( validation.status === true ) {
      res.redirect('review');
    } else {
      res.render('sprint1/other', {session: req.body, errors: validation.errors, validate: validation});
    }
  });
// end Other


// Review
  router.get('/review', function(req, res) {
    var details = req.cookies.details_more;
    var fraud_types = req.cookies.fraud_urls;
    var review = {'name': details.first_name + ' ' + details.last_name, titles: req.cookies.details_get_options_titles};
    var additional = req.cookies.additional;

    res.render('sprint1/review', {review: review, additional: additional});
  });

  router.post('/review', function(req, res) {
    res.redirect('complete');
  });
// end Review


// Review
  router.get('/complete', function(req, res) {
    res.render('sprint1/complete');
  });
// end Review


// Exit Page
  router.get('/exit', function(req, res) {
    var details = req.cookies.details;
    if (  details.name && details.address && details.age ||
          details.nino && details.name ) {
      res.redirect('details');
    } else {
      var render = functions.exit_page(req, res);
      res.render('sprint1/exit', {render: render});
    }
  });

  router.post('/exit', function(req, res) {
    var valid = functions.process_exit_page(req, res);
    session.update(req, res);

    if ( valid ) {
      res.redirect('details-more');
    } else {
      var needed = functions.exit_page_needed(req, res);

      res.render('sprint1/exit', {exit_warning: {'status': true, needed: needed}});
    }
  });
// end Exit Page

// Feedback
  router.get('/feedback', function(req, res) {
    res.render('sprint1/feedback');
  });

  router.post('/feedback', function(req, res) {
    res.render('sprint1/feedback-complete');
  });
// end Feedback

module.exports = router;
