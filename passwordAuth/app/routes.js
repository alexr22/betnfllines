var Game = require('./models/game.js');
var Bet = require('./models/bet.js')

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/main', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/main', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/main', isLoggedIn, function(req, res) {

        res.render('main.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    //route to post bet to user database
    app.post('/placeBet', function(req, res) {

    })
    //gets the games for each week and sends them to main.ejs
    app.get('/main/:week', function(req, res) {
        Game.find({'week': req.params.week}, function(err, found) {
            if(err) {
                console.log(err);
            }else {
                res.json(found);
            }
        }) 
    })
    //figuring out button id's
    // app.get('/main/', function(req, res) {
    //     $('.awayTeam').on('click', function(err, found) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             $.ajax({
    //                 method: "GET",
    //                 url: '/main',
    //                 data: $(this).attr('data-id'),
    //                 }).done(function(data){
    //                     console.log(req.data)
                    
    //             })
    //         }
    //     })
    // })


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



// $(document).on('click', function() {
//     var thisId = $(this).attr('data-id');

//     console.log(thisId);
//     // Game.find({'_id': req.params.id}, function(err, found) {
//     //     if(err) {
//     //         console.log(err);

//     //     }else {
//     //         res.json(found)
//     //     }
//     // })
// })

