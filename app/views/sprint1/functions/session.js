var sessions = {
  // Write session cookies
  update: function(req, res) {



    // council
    if ( req.path === '/subletting' ) {
      res.cookie('subletting', req.body);
    }

    // Details More
    if ( req.path === '/details-more' ) {
      if ( req.body.other_name_select === 'Yes' ) {
        req.body.other_name_yes = 'checked';
        req.body.show_other_name = 'block';
      } else if ( req.body.other_name_select === 'No' ) {
        req.body.other_name_no = 'checked';
        req.body.show_other_name = 'none';
      }

      if ( req.body.dob_select === 'Yes' ) {
        req.body.dob_yes = 'checked';
        req.body.show_dob = 'block';
        req.body.show_age = 'none';
      } else if ( req.body.dob_select === 'No' ) {
        req.body.dob_no = 'checked';
        req.body.show_dob = 'none';
        req.body.show_age = 'block';
      } else {
        req.body.show_dob = 'none';
        req.body.show_age = 'none';
      }

      res.cookie('details_more', req.body);
    }

    // Fraud Type
    if ( req.path === '/fraud-type' ) {
      var fraud_urls = {};
      var fraud_titles = [];

      for ( var selection in req.body ) {
        fraud_urls[selection] = req.body[selection];
        if ( selection === 'employment' ) {
          fraud_titles.push({'title':'is working and claiming benefit'});
        }

        if ( selection === 'partner' ) {
          fraud_titles.push({'title':'is living with a partner while claiming to be living alone'});
        }

        if ( selection === 'disability' ) {
          fraud_titles.push({'title':'is dishonestly claiming disability benefit'});
        }

        if ( selection === 'carers' ) {
          fraud_titles.push({'title':'is dishonestly claiming carers benefit'});
        }

        if ( selection === 'abroad' ) {
          fraud_titles.push({'title':'is claiming benefits but not living in the UK'});
        }

        if ( selection === 'identity' ) {
          fraud_titles.push({'title':"is using someone else's identity"});
        }

        if ( selection === 'income' ) {
          fraud_titles.push({'title':'is not declaring savings or other income'});
        }

        if ( selection === 'other' ) {
          fraud_titles.push({'title':'is committing some type of fraud'});
        }
      }
      res.cookie('fraud_urls', fraud_urls);
      res.cookie('fraud_titles', fraud_titles);
    }

    // Employment Details
    if ( req.path === '/employment-details' ) {
      req.body.employment_hidden = 'none';
      req.body.self_employed_hidden = 'none';
      req.body.unknown_hidden = 'none';

      if ( req.body.employment_select === 'employed' ) {
        req.body.employed = 'checked';
        req.body.employment_hidden = 'block';
      } else if ( req.body.employment_select === 'self_employed' ) {
        req.body.self_employed = 'checked';
        req.body.self_employed_hidden = 'block';
      } else if ( req.body.employment_select === 'unknown' ) {
        req.body.unknown = 'checked';
        req.body.unknown_hidden = 'block';
      }

      res.cookie('employment_details', req.body);
    }

    // Partner Details
    if ( req.path === '/partner-details' ) {
      req.body.address_details_hidden = 'none';
      req.body.dob_hidden = 'none';
      req.body.approximate_age_hidden = 'none';

      if ( req.body.other_name_select == 'Yes' ) {
        req.body.other_name_yes = 'checked';
        req.body.other_name_hidden = 'block';
      } else if ( req.body.other_name_select == 'No' ) {
        req.body.other_name_no = 'checked';
        req.body.other_name_hidden = 'none';
      }

      if ( req.body.dob_select == 'Yes' ) {
        req.body.dob_yes = 'checked';
        req.body.dob_hidden = 'block';
      } else if ( req.body.dob_select == 'No' ) {
        req.body.dob_no = 'checked';
        req.body.approximate_age_hidden = 'block';
      }

      if ( req.body.address_details == 'yes_and_know' ) {
        req.body.yes_and_know = 'checked';
        req.body.address_details_hidden = 'block';
      } else if ( req.body.address_details == 'yes_and_dont_know' ) {
        req.body.yes_and_dont_know = 'checked';
      } else if ( req.body.address_details == 'no' ) {
        req.body.no = 'checked';
      } else if ( req.body.address_details == 'unknown' ) {
        req.body.unknown = 'checked';
      }

      if ( req.body.nino_select == 'Yes' ) {
        req.body.nino_select_yes = 'checked';
        req.body.nino_select_hidden = 'block';
      } else if ( req.body.nino_select == 'No' ) {
        req.body.nino_select_no = 'checked';
        req.body.nino_select_hidden = 'none';
      }

      if ( req.body.phone_select == 'Yes' ) {
        req.body.phone_select_yes = 'checked';
        req.body.phone_select_hidden = 'block';
      } else if ( req.body.phone_select == 'No' ) {
        req.body.phone_select_no = 'checked';
        req.body.phone_select_hidden = 'none';
      }

      if ( req.body.email_select == 'Yes' ) {
        req.body.email_select_yes = 'checked';
        req.body.email_hidden = 'block';
      } else if ( req.body.email_select == 'No' ) {
        req.body.email_select_no = 'checked';
        req.body.email_hidden = 'none';
      }

      res.cookie('partner_details', req.body);
    }

    // Partner Employment
    if ( req.path === '/partner-employment' ) {
      if ( req.body.pn_employment_select == 'Yes' ) {
        req.body.pn_employment_select_yes = 'checked';
        req.body.pn_employment_hidden = 'block';

        req.body.employment_hidden = 'none';
        req.body.self_employed_hidden = 'none';
        req.body.unknown_hidden = 'none';

        if ( req.body.employment_select == 'employed' ) {
          req.body.employed = 'checked';
          req.body.employment_hidden = 'block';
        } else if ( req.body.employment_select == 'self_employed' ) {
          req.body.self_employed = 'checked';
          req.body.self_employed_hidden = 'block';
        } else if ( req.body.employment_select == 'unknown' ) {
          req.body.unknown = 'checked';
          req.body.unknown_hidden = 'block';
        }
      } else if ( req.body.pn_employment_select == 'No' ) {
        req.body.pn_employment_select_no = 'checked';
        req.body.employment_hidden = 'none';
      }
      res.cookie('partner_employment', req.body);
    }

    // Disability
    if ( req.path === '/disability' ) {
      res.cookie('disability', req.body);
    }

    // Carers
    if ( req.path === '/carers' ) {
      if ( req.body.job_select == 'Yes' ) {
        req.body.job_yes = 'checked';
        req.body.job_no = '';
        req.body.job_hidden_display = "block";
      } else if ( req.body.job_select == 'No' ) {
        req.body.job_yes = '';
        req.body.job_no = 'checked';
        req.body.job_hidden_display = "hidden";
      }

      res.cookie('carers', req.body);
    }

    // Carers-More
    if ( req.path === '/carers-more' ) {
      if ( req.body.who_select == "Yes" ) {
        req.body.who_yes = 'checked';
        req.body.who_no = '';
        req.body.who_hidden_display = 'block';
      } else   if ( req.body.who_select == "No" ) {
        req.body.who_yes = '';
        req.body.who_no = 'checked';
        req.body.who_hidden_display = 'hidden';
      }

      if ( req.body.dob_select == "Yes" ) {
        req.body.dob_yes = "checked";
        req.body.dob_hidden_display = "block";
        req.body.age_hidden_display = "hidden";
      } else if ( req.body.dob_select == "No" ) {
        req.body.dob_no = "checked";
        req.body.dob_hidden_display = "hidden";
        req.body.age_hidden_display = "block";
      }

      if ( req.body.address_select == "Yes" ) {
        req.body.address_yes = "checked";
        req.body.address_hidden_display = "block";
      } else if ( req.body.address_select == "No" ) {
        req.body.address_no = "checked";
        req.body.address_hidden_display = "hidden";
      }

      res.cookie('carers-more', req.body);
    }

    // Abroad
    if ( req.path === '/abroad' ) {
      res.cookie('abroad', req.body);
    }

    // Identity
    if ( req.path === '/identity' ) {
      res.cookie('identity', req.body);
    }

    // Income
    if ( req.path === '/income' ) {
      res.cookie('income', req.body);
    }

    // Income More
    if ( req.path === '/income-more' ) {
      if ( req.body.winnings_select == 'checked' ) {
        req.body.winnings_hidden = 'block';
      }

      if ( req.body.savings_select == 'checked' ) {
        req.body.savings_hidden = 'block';
      }

      if ( req.body.sale_of_something_select == 'checked' ) {
        req.body.sale_of_something_hidden = 'block';
      }

      if ( req.body.pension_select == 'checked' ) {
        req.body.pension_hidden = 'block';
      }

      if ( req.body.other_income_select == 'checked' ) {
        req.body.other_income_hidden = 'block';
      }

      if ( req.body.inheritance_select == 'checked' ) {
        req.body.inheritance_hidden = 'block';
      }

      if ( req.body.compensation_select == 'checked' ) {
        req.body.compensation_hidden = 'block';
      }
      res.cookie('income_more', req.body);
    }

    // Income More
    if ( req.path === '/other' ) {

      res.cookie('other', req.body);
    }

    // Additional Information
    if ( req.path === '/additional-information' ) {
      res.cookie('additional', req.body);
    }

    // Exit Page
    if ( req.path === '/exit' ) {
      var details = req.cookies.details;

      if ( req.body.name == 'true' ) {
        details.name = 'true';
      }

      if ( req.body.address == 'true' ) {
        details.address = 'true';
      }

      if ( req.body.age == 'true' ) {
        details.age = 'true';
      }

      res.cookie('details', details);
    }
  }
};

module.exports = sessions;
