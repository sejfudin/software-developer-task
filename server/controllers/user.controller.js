const User = require('../models/user.model');
const { OAuth2Client } = require('google-auth-library');
const jwt = require("jsonwebtoken");

const client = new OAuth2Client("593666384376-ngcoi5gfh139p8jbiidf2kosedh7l1j8.apps.googleusercontent.com");

//Google user
const googleLogin = async (req, res, next) => {
    
    const { tokenId } = req.body;
    
    client.verifyIdToken({ idToken: tokenId, audience: "593666384376-ngcoi5gfh139p8jbiidf2kosedh7l1j8.apps.googleusercontent.com" })
        .then(response => {
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                console.log('okino')
                User.findOne({ email }).exec((err, user) => {

                    if (err) {
                        return res.status(400).json({
                            error: "Something went wrong"
                        })
                    } else {
                        if (user) {
                            const token = jwt.sign({ _id: user._id }, "moj_secret", { expiresIn: '7d' });
                            const { _id, name, email } = user;
                            res.json({
                                token,
                                user: { _id, name, email }
                            })
                        } else {
                            let newUser = new User({ name, email });
                            newUser.save((err, data) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: "Something went wrong"
                                    })
                                }
                                const token = jwt.sign({ _id: data._id }, "moj_secret", { expiresIn: '7d' });
                                const { _id, name, email } = newUser;
                                res.json({
                                    token,
                                    user: { _id, name, email }
                                })
                            })
                        }
                    }
                })
            }
        })
};

exports.googleLogin = googleLogin;