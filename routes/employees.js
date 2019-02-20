
/*
 * GET users listing.
 */

exports.list = function (req, res) {

    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM employee', function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            //console.log(rows);
            //res.render('employees',{page_title:"employees - Node.js",data:rows});
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.end(JSON.stringify(rows));  
        });

        console.log(query.sql);
    });
};

exports.edit = function (req, res) {
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM employee WHERE id = ?', [id], function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            // res.render('edit_employee',{page_title:"Edit employees - Node.js",data:rows});
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
        });
        //console.log(query.sql);
    });
};
/*Save the employee*/
exports.save = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.mobile,
            country: input.countrySrc,
            state: input.state,
            city:input.city
        };
        console.log('save request...', data);

        var query = connection.query("INSERT INTO employee set ? ", data, function (err, rows) {

            if (err)
                console.log("Error inserting : %s ", err);

            //res.redirect('/employees');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify('success'));

        });

        // console.log(query.sql); get raw query

    });
};

exports.save_edit = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone,
            state: input.state,
            city: input.city
         };

        connection.query("UPDATE employee set ? WHERE id = ? ", [data, id], function (err, rows) {

            if (err)
                console.log("Error Updating : %s ", err);

            res.redirect('/employees');

        });

    });
};


exports.delete_employee = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM employee  WHERE id = ? ", [id], function (err, rows) {

            if (err)
                console.log("Error deleting : %s ", err);

            res.redirect('/employees');

        });

    });
};


