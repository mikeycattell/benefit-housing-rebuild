var validations = {
  page: function(req) {
    var required = [],
        validation = {'status': true},
        errors = {};
        invalid_fields = [];


    // Validate Fraud Type
    if ( req.path == '/fraud-type' ) {
      if ( Object.keys(req.body).length === 0 ) {
        validation.status = false;
        errors = get_errors('', 'You must select at least one option');
      }
      validation.errors = get_errors('', '', required);
      return validation;
    }

    // Validate Employment Details Page
    if ( req.path == '/employment-details' ) {
      validation.errors = get_errors('', '', required);
      return validation;
    }

    // Partner Details
    if ( req.path == '/partner-details' ) {
      if ( req.body.other_name_select === 'Yes' ) {
        if ( req.body.other_name === '' ) {
          validation.status = false;
          validation.other_name = 'error';
          required.push('Other name');
        }
      }

      if ( req.body.address_details === 'yes_and_know') {
        if ( req.body.street === '' ) {
          validation.status = false;
          validation.street = 'error';
          required.push('Street');
        }

        if ( req.body.town === '' ) {
          validation.status = false;
          validation.town = 'error';
          required.push('Town');
        }
      }

      if ( req.body.dob_select === 'Yes' ) {
        if ( req.body.dob_day === '' || req.body.dob_month === '' || req.body.dob_year === '' ) {
          validation.status = false;
          validation.dob = 'error';
          required.push('Date of birth');
        }
      } else {
        if ( req.body.age === '' ) {
          validation.status = false;
          validation.age = 'error';
          required.push('Approximate age');
        }
      }

      if ( req.body.nino_select === 'Yes' ) {
        if ( req.body.nino === '' ) {
          validation.status = false;
          validation.nino = 'error';
          required.push('National Insurance number');
        }
      }

      if ( req.body.phone_select === 'Yes' ) {
        if ( req.body.phone === '' ) {
          validation.status = false;
          validation.phone = 'error';
          required.push('Phone');
        }
      }

      if ( req.body.email_select === 'Yes' ) {
        if ( req.body.email === '' ) {
          validation.status = false;
          validation.email = 'error';
          required.push('Email');
        }
      }
      validation.errors = get_errors('', '', required);
      return validation;
    }

    // Partner Employment
    if ( req.path == '/partner-employment' ) {

      return validation;
    }

    // Disability
    if ( req.path == '/disability') {
      if ( req.body.what_makes_you_doubt === '' ) {
        validation.status = false;
        validation.what_makes_you_doubt = 'error';
        required.push('What activity are they doing?');
      }
      validation.errors = get_errors('', '', '');
      return validation;
    }

    // Carers
    if ( req.path == '/carers') {
      if ( req.body.carers === '' ) {
        validation.status = false;
        validation.why_do_you_think_that = 'error';
        required.push('Why do you think that?');
      }
      validation.errors = get_errors('', '', '');
      return validation;
    }

    // Abroad
    if ( req.path == '/abroad') {
      validation.errors = get_errors('', '', '');
      return validation;
    }

    // Identity
    if ( req.path == '/identity') {
      if ( req.body.identity === '' ) {
        validation.status = false;
        validation.identity = 'error';
        required.push("Why do you think they're committing identity fraud?");
      }
      validation.errors = get_errors('', '', '');
      return validation;
    }

    // Income
    if ( req.path == '/income') {
      if ( req.body.what_makes_you_think === '' ) {
        validation.status = false;
        validation.what_makes_you_think = 'error';
        required.push('What makes you think this person has undeclared savings or income?');
      }
      validation.errors = get_errors('', '', '');
      return validation;
    }

    // Income More
    if ( req.path == '/income-more') {
      var counter = 0;

      for ( var element in req.body ) {
        if ( req.body[element] === '' ) {
          counter++;
        }
      }

      if ( Object.keys(req.body).length === counter ) {
        validation.status = false;
        validation.errors = get_errors('', 'You must select at least one option');
      } else {
        validation.errors = get_errors('', '', '');
      }

      return validation;
    }

    // Other
    if ( req.path == '/other') {
      if ( req.body.other === '' ) {
        validation.status = false;
        validation.other = 'error';
        required.push('other');
      }
      validation.errors = get_errors('', '', '');
      return validation;
    }
  }
};

module.exports = validations;

function get_errors(message, desc, linkref) {
  var errors = {};

  if ( message === undefined || message === '' ) {
    errors.message = "There was a problem";
  } else {
    errors.message = message;
  }

  if ( desc === undefined || desc === '' ) {
    errors.desc = 'Please check you have filled out all the relevant fields';
  } else {
    if ( desc.constructor === Array ) {
      errors.array = true;
    }
    errors.desc = desc;
  }

  if ( linkref === undefined ) {
    errors.linkref = "";
  } else {
    errors.linkref = linkref;
  }

  return errors;
}
