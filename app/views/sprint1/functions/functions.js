var functions = {
  // Get options for details page
  details_get_options: function(req) {
    var options = [
      build_radio(req, 'Council Property', 'council', 'council'),
      build_radio(req, 'Private property', 'private', 'private'),
      build_radio(req, 'Contrived tenancy', 'contrived', 'contrived'),
      build_radio(req, 'Non-residence', 'residence', 'residence'),
      build_radio(req, 'Undeclared non-dependants', 'dependants', 'dependants'),
      build_radio(req, 'Landlord fraud', 'landlord', 'landlord')
    ];

    function build_radio(req, title, id, value) {
      var checked = '';

      if ( req.cookies.details !== undefined ) {
        if ( req.cookies.details[id] ) {
          checked = 'checked';
        }
      }

      return {'title': title, 'id': id, 'value': value, 'checked': checked};
    }
    return options;
  },

  fraud_type_get_options: function(req) {
    var options = [
      build_checkbox(
        req,
        'Working and claiming benefit',
        'not declaring that they are working, under reporting the number of hours or the amount they earn, including cash in hand.',
        'employment',
        'true'
      ),
      build_checkbox(
        req,
        'Living with a partner while claiming to be living alone',
        'their benefit claim is based on them living alone and they haven’t declared that they now live with a partner. A partner could be someone they are married to, a civil partner or someone they live with as if they were married or in a civil partnership.',
        'partner',
        'true'
      ),
      build_checkbox(
        req,
        'Dishonestly claiming a disability benefit',
        'they do not really have the disability they are claiming for.',
        'disability',
        'true'
      ),
      build_checkbox(
        req,
        'Dishonestly claiming a carers benefit',
        'they aren’t actually providing care, but claiming to do so.',
        'carers',
        'true'
      ),
      build_checkbox(
        req,
        'Claiming benefits but not living in the UK',
        'the person’s benefit claim is based on a UK address and they have not notified the relevant government department that they now live outside the UK.',
        'abroad',
        'true'),
      build_checkbox(
        req, "Using someone else's identity",
        'the person has based their claim for benefit using someone else’s personal details (this could include their name, date of birth, National Insurance number).',
        'identity',
        'true'),
      build_checkbox(
        req,
        'Not declaring savings or other non-work related income',
        'when the person hasn’t declared other non-work related income, such as savings, inheritance, winnings, property, pensions or compensation.',
        'income',
        'true'),
      build_checkbox(
        req,
        'I dont know',
        '',
        'other',
        'true'),
    ];

    function build_checkbox(req, title, desc, id, value) {
      var checked = '';

      if ( desc === undefined ) {
          desc = '';
      }
      if ( req.cookies.fraud_urls !== undefined ) {
        if ( req.cookies.fraud_urls[id] ) {
          checked = 'checked';
        }
      }

      return {'title': title, 'id': id, 'desc': desc, 'value': 'true', "checked": checked};
    }
    return options;
  },

  process_exit_page: function(req, res) {
    for ( var selection in req.body ) {
      if ( req.body[selection] === 'false' ) {
        return false;
      }
    }
    return true;
  },

  exit_page_needed: function(req, res) {
    var needed_array = functions.exit_page(req, res);
    var needed = '';

    if ( needed_array.length === 1 ) {
      needed = needed_array[0].title + ' is needed.';
    } else if ( needed_array.length === 2 ) {
      needed = needed_array[0].title + ' and ' + needed_array[1].title + ' needed.';
    } else if ( needed_array.length === 3 ) {
      needed = needed_array[0].title + ', ' + needed_array[1].title + ' and ' + needed_array[2].title + ' are needed.';
    }

    return needed;
  },

  exit_page: function(req, res) {
    var not_selected = [];
    if ( req.cookies.details.nino ) {
      if ( !req.cookies.details.name ) {
        not_selected.push({'title':'Name', 'hint': 'First name and last name', 'id': 'name'});
      }
    } else {
      if ( !req.cookies.details.name ) {
        not_selected.push({'title':'Name', 'hint': 'First name and last name','id': 'name'});
      }

      if ( !req.cookies.details.address ) {
        not_selected.push({'title':'Address', 'hint': 'At least street and town','id': 'address'});
      }

      if ( !req.cookies.details.age ) {
        not_selected.push({'title':'Approximate age', 'hint': '', 'id': 'age'});
      }
    }

    return not_selected;
  }
};


module.exports = functions;
