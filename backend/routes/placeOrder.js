const router = require("express").Router()
const nodemailer = require("nodemailer")

router.post("/", async (req, res) => {
    const receiver = req.body.seller
    const customer = req.body.customer
    const products = req.body.state
    
    // req.body is of the following format
    // {
    //     customerDetails: {name: '',email: '',contact: '',address: {line1: '',line2: '',line3: ''},
    //     items:  [{name1: '',quantity1: '',price1: ''}],
    //     seller: 'sellerEmail'
    // }
    // -> items is an array containing details of item to be bought from current seller
    // -> there is separate api request for each seller containing details about product
    //    to be bought from that store

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          //authentication data through which email is sent
          user: email,
          pass: password,
        },
    });

    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    //items is just a variable which combinedly stores product details
    //just to format message
    var items = "",index=1
    products.forEach(element => {
        items += index + '. ' + element.name + ' - ' + element.quantity + '<br/>'
        index++;
    })

    var mailOptions = {
        from: 'saralsrivastava25@gmail.com',
        to: receiver,
        subject: 'New Order',
        html:   '<h1>List of Ordered products: </h1>'
                    + '<h3>' + items + '</h3>'
                +'<h1>Order placed by: </h1>'
                    + '<h3>'
                        + 'Name: ' + customer.name + '<br/>'
                        + 'Contact: ' + customer.contact + '<br/>'
                        + 'Email: ' + customer.email + '<br/>'
                    +'</h3>'
                +'<h2>Address: </h2>'
                    + '<h3>' + customer.address.line1 + ',<br/>'
                    + customer.address.line2 + ',<br/>'
                    + customer.address.line3 + ',<br/>'
                    + '</h3>'
                
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent !');
        }
    });
})

module.exports = router