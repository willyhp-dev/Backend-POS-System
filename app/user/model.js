const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UserSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: [true, "Nama  Harus Diisi "],
            maxlength: [255, "Panjang nama harus antara 3-255 karakter"],
            minlength: [3, "Panjang nama harus antara 3-255 karakter "],
        },
        customer_id: {
            type: Number,
        },
        email: {
            type: String,
            required: [true, 'Email harus diisi'],
            maxlength:[255,'Panjang email maksimal 255 karakter']
        },
        password: {
            type: String,
            required: [true, 'Password harus diisi'],
            maxlength:[255,'Panjang password maksimal 255 karakter']
        },
        role: {
            type: String,
            enum:['user','admin'],
            default:'user'
        },
        token:[String]
    },{ timestamps: true }
);
UserSchema.path('email').validate(function (value) {

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(value);
}, Attr=>`${Attr.value}harus merupakan email yang valid`);
UserSchema.path('email').validate(async function (value) {
    try {
        const count = await this.model('User').count({ email: value });
        return !count;
    } catch (error) {
        throw error;
    }
}, Attr => `${Attr.value}sudah terdaftar`);
const HASH_ROUND = 10;
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next()
});
UserSchema.plugin(AutoIncrement, { inc_field: 'customer_id' });
const User = mongoose.model("User", UserSchema);
module.exports = User;
